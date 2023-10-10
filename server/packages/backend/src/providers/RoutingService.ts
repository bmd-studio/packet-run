import { Loaded, MikroORM, RequiredEntityData } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { sample } from 'lodash';
import Run, { RunPacketType } from '../entities/run/index.entity';
import RunHop, { RunHopStatus, RunHopType } from '../entities/runHop/index.entity';
import Terminal, { TerminalStatus, TerminalType } from '../entities/terminal/index.entity';
import TracerouteHop from '../entities/tracerouteHop/index.entity';
import { getPreviousHop, getTerminalWithShortestPath } from '../lib/RoutingUtils';
import altHops from '../data/altHops';
import haversine, { LatLng } from '../lib/haversine';
import Address from '../entities/address/index.entity';
import { IpregistryClient } from '@ipregistry/client';

/**
 * This contains all logic that determines how packets are routed across our
 * fake internet.
 */
@Injectable()
export default class RoutingService {
    private logger = new Logger(RoutingService.name);

    constructor(
        private orm: MikroORM,
        private client: IpregistryClient,
    ) {}

    /**
     * When a packet is scanned at a new terminal, we need to validate and
     * record which route has been taken by the user. Based on this, we will
     * also generate a new set of routes the user may take.
     */
    async process(run: Loaded<Run, "hops">, receivingTerminal: Terminal) {
        this.logger.debug(`🔄 Processing a navigation event for run "${run.id}" with receiving terminal "${receivingTerminal.id}"`);

        // Validate the path that was taken
        const hop = await this.orm.em.findOne(RunHop, {
            run, hop: run.currentHopIndex, terminal: receivingTerminal,
        });

        // GUARD: Check that the receiving terminal is actually a valid
        // destination for this particular run
        if (!hop) {
            this.logger.debug('Current, potential hop could not be found for terminal');
        
            // In case not at the current hop, check if we're at least at the
            // previous hop
            const previousHop = await this.orm.em.findOne(RunHop, {
                run, hop: run.currentHopIndex - 1, terminal: receivingTerminal, status: RunHopStatus.ACTUAL,
            });

            if (previousHop) {
                this.logger.debug('Terminal has already been scanned. No need to generate new hops.');
                // If so, we've already done the processing and need to do no
                // further. The use is probably scanning the packet at the same
                // terminal because of a timeout or something.
                return;
            } else {
                // If not, the user is at the wrong terminal
                throw new Error(`StateError: invalid terminal. The terminal with id "${receivingTerminal.id}" is not currently a destination for this run`);
            }

        }

        // Update the hop to signify this was the path that is actually taken
        hop.status = RunHopStatus.ACTUAL;
        
        // Also update the past and present terminals
        if (run.terminal) {
            this.logger.debug(`Found a previous terminal (${run.terminal.id}) and resetting its status...`);

            run.terminal.status = TerminalStatus.IDLE;
            run.terminal.run = null;
            
            // We need to flush to prevent any sqlite constraint errors
            await this.orm.em.flush();
        }

        // Assign the run to the new terminal
        receivingTerminal.run = run;

        // Update the database
        await this.orm.em.flush();

        this.logger.debug(`Assigned the run "${run.id}" to the receiving terminal "${receivingTerminal.id}".`)
        
        // ...now, generate some routes
        if (hop.terminal.type === TerminalType.GATEWAY) {
            await this.generateGatewayHop(run);
        } else if (hop.terminal.type === TerminalType.SERVER) {
            await this.generateServerHop(run, hop);
        } else if (hop.terminal.type === TerminalType.RECEIVER) {
            return;
        } else {
            await this.generateNextHops(run);
        }

        // Increment the hop index and save to the database
        run.currentHopIndex += 1;
        await this.orm.em.flush();

        this.logger.debug('✅ Hops have been generated and the index is updated. Job done.');
    }

    /**
     * Insert a hop that points to the previously visited terminal. 
     * NOTE: Don't forget to call `await this.em.flush()` after calling this function.
     */
    private async insertPreviousHop(run: Run) {
        const previousHop = await getPreviousHop(run);

        await this.createHop({
            run,
            terminal: previousHop.from,
            type: RunHopType.PREVIOUS,
            address: previousHop.hop.address,
            hop: run.currentHopIndex + 1,
        });

        return previousHop;
    }

    /**
     * This will generate hop options for the last hop. This is the hop that is
     * supposed to travel from the `gateway` to the `receiver`
     */
    private async generateGatewayHop(run: Run) {
        this.logger.debug('Generating hops for gateway-type terminal...');

        // Retrieve the relevant hops
        const [client, , internet] = await this.orm.em.find(TracerouteHop, { run, hop: { $lte: 3 }}, { orderBy: [{ hop: 'ASC' }]});

        this.logger.debug(`Retrieved client hop "${client.address?.ip}" and internet hop "${internet.address?.ip}"`);

        // GUARD: Check that traceroute has progressed far enough
        if (!internet) {
            throw new Error('Could not find internet hop. Please try again when the internet hop is resolved.');
        }

        // Retrieve the right terminals that are connected to the gateway
        const gateway = await this.orm.em.findOneOrFail(Terminal, { type: TerminalType.GATEWAY }, { populate: ['connectionsTo.to']});
        const internetTerminal = gateway.connectionsTo.getItems()
            .find((c) => c.to.type === TerminalType.ROUTER);
        const receiverTerminal = gateway.connectionsTo.getItems()
            .find((c) => c.to.type === TerminalType.RECEIVER);

        // This is the hop to the internet
        await this.createHop({
            run,
            terminal: internetTerminal.to,
            type: run.packetType === RunPacketType.REQUEST 
                ? RunHopType.RECOMMENDED
                : RunHopType.PREVIOUS,
            address: internet?.address,
            hop: run.currentHopIndex + 1,
        });

        // This is the hop back to the computer
        await this.createHop({
            run,
            terminal: receiverTerminal.to,
            type: run.packetType === RunPacketType.REQUEST 
                ? RunHopType.PREVIOUS
                : RunHopType.RECOMMENDED,
            address: client?.address,
            hop: run.currentHopIndex + 1,
        });

        // Save to the database
        await this.orm.em.flush();
    }

    /**
     * Generate the next hop from a server
     */
    private async generateServerHop(run: Run, currentHop: RunHop) {
        this.logger.debug('Generating hops for server-type terminal...');

        // GUARD: Check that we're at the destination server
        if (currentHop.address?.ip === run.destination?.ip) { 
            this.logger.debug('Currently at the destination server for this route.');
            const gateway = await this.orm.em.findOneOrFail(TracerouteHop, { run, hop: 2 });

            // If we are, we offer the wormhole option
            await this.createHop({
                run,
                terminal: 2,
                type: RunHopType.WORMHOLE,
                address: gateway.address,
                hop: run.currentHopIndex + 1,
            });
        } 

        // Always offer the option of going back
        await this.insertPreviousHop(run);

        // Save to database
        await this.orm.em.flush();
    }

    /**
     * Generate the next set of hops for the current run. This will calculate
     * the next recommended hop and a set of alternative hops.
     */
    private async generateNextHops(run: Run) {
        this.logger.debug('Generating hops for generic terminal types...');

        // Create the previous hop
        // TODO: Only insert this after we can conclude that the previous hop is
        // not the recommended hop
        const { hop: previousHop, from: previousTerminal } = await this.insertPreviousHop(run);

        // TODO: Check in the history of runhops for earlier occurences of the
        // next recommended hops so we can copy them.

        // Determine all options that don't route to the previous hop
        const terminals = run.terminal.connectionsTo.getItems()
            .map((c) => c.to)
            .filter((t) => t.id !== previousTerminal.id);

        this.logger.debug(`Available paths to terminals "${JSON.stringify(terminals.map((t) => t.id))}"`);

        // Calculate the shortest path to the destination terminal
        const { terminalId, route, destination } = await getTerminalWithShortestPath(
            run,
            run.packetType === RunPacketType.RESPONSE ? TerminalType.RECEIVER : TerminalType.SERVER,
            this.orm,
            previousTerminal
        );

        this.logger.debug(`Calculated shortest path to destination "${destination}". Recommending terminal "${terminalId}" via route "${JSON.stringify(route)}"`)

        // Pick a single router and make it the recommended router
        let recommendedTerminal: Terminal;
        if (run.currentHopIndex > 3) {
            recommendedTerminal = terminals.find((r) => r.id === terminalId);
            this.logger.debug(`Packet is advanced far enough for proceeding to server. Recommending terminal "${recommendedTerminal?.id}"`);
        } else {
            recommendedTerminal = sample(terminals);
            this.logger.debug(`Packet is too new. Shuffling terminal, now recommending terminal "${recommendedTerminal?.id}"`);
        }
        
        // Extract the recommended routers from the array
        let otherRouters = terminals.filter((t) => t.id !== recommendedTerminal.id);

        // GUARD: Check if the selected recommended terminal is actually valid
        if ((recommendedTerminal.type === TerminalType.SERVER && previousHop.type !== RunHopType.RECOMMENDED)
            || (recommendedTerminal.type === TerminalType.GATEWAY && run.packetType !== RunPacketType.RESPONSE)
        ) {
            this.logger.debug(`The recommended terminal is not valid. Marking as such and finding new recommended terminal.`);

            // If it isn't, mark this terminal as an invalid hop
            await this.createHop({
                run,
                terminal: recommendedTerminal,
                type: RunHopType.INVALID,
                // TODO: Retrieve next address
                address: null,
                hop: run.currentHopIndex + 1,
            });

            // Then, select a new terminal at random
            recommendedTerminal = sample(otherRouters);
            otherRouters = otherRouters.filter((t) => t.id !== recommendedTerminal.id);

            this.logger.debug(`New recommended terminal: "${recommendedTerminal.id}"`);
        }

        // Get the right address for the recommended hop
        const address = await this.retrieveAddressForHop(run, route.length - 1);

        this.logger.debug(`Assigning address "${address?.ip}" to recommended hop`);

        // Create the recommended hop
        await this.createHop({
            run,
            terminal: recommendedTerminal,
            type: RunHopType.RECOMMENDED,
            address,
            mayPerformTransformation: recommendedTerminal.type === TerminalType.SERVER,
            hop: run.currentHopIndex + 1,
        });

        // Attempt to retrieve the coordinates for the recommended hop
        const adressLocation = address?.info?.location || null;
        const recommendedLatLng: LatLng | null = adressLocation && [
            adressLocation.latitude, adressLocation.longitude,
        ];

        // If the coordinates are available, sort the alt hops based on distance
        const sortedAltHops = recommendedLatLng && altHops.sort((a, b) => (
            haversine(a.location, recommendedLatLng) - haversine(b.location, recommendedLatLng)
        ));

        // All other routes become alternative routes
        await Promise.all(otherRouters.map(async (terminal, i) => {
            // Retrieve the closest alternative hop
            const altHop = sortedAltHops ? sortedAltHops[i] : null;

            // Then, insert it as an address
            const address = sortedAltHops
                ? await this.orm.em.upsert(Address, { 
                    ip: altHop.ip,
                    info: (await this.client.lookup(altHop.ip)).data,
                })
                : await this.orm.em.upsert(Address, {
                    ip: sample(altHops).ip,
                    isInAltNetwork: true,
                });

            // Create the alternative hop
            await this.createHop({
                run,
                terminal,
                type: RunHopType.ALTERNATIVE,
                address: address,
                hop: run.currentHopIndex + 1,
            });
        }));
    }

    /**
     * Give a particular run and destination terminal, retrieve an address that
     * should be used for the recommended router.
     */
    private async retrieveAddressForHop(run: Run, distanceToDestination: number) {
        this.logger.debug(`Attempting to retrieve the recommended address for this run...`);

        // GUARD: If this is the final hop to either the server or the receiver
        if (distanceToDestination === 1) {
            this.logger.debug(`Currently at final hop. Returning origin or destination address...`);
            if (run.packetType === RunPacketType.REQUEST) {
                // Return the server address for requests
                return run.destination;
            } else if (run.packetType === RunPacketType.RESPONSE) {
                // Return the client address for responses
                const hop = await this.orm.em.findOneOrFail(TracerouteHop, { run, hop: 1 });
                return hop.address
            }
        // GUARD: Check whether this is the last router before the destination
        } else if (distanceToDestination === 2) {
            this.logger.debug(`Currently at second-to-final hop. Returning gateway or gateway router addresses...`);
            if (run.packetType === RunPacketType.REQUEST) {
                // Return the last hop
                const hop = await this.orm.em.findOneOrFail(TracerouteHop, { run }, { orderBy: [{ hop: 'DESC' }]});
                return hop.address
            } else if (run.packetType === RunPacketType.RESPONSE) {
                // Return the gateway address
                const hop = await this.orm.em.findOneOrFail(TracerouteHop, { run, hop: 1 });
                return hop.address
            }
        // GUARD: In other cases, dynamically pick a hop that represents the
        // distance well
        } else {
            this.logger.debug('Currently somewhere half-way. Retrieving all tracerouted hops...');
            const hops = await this.orm.em.find(
                TracerouteHop,
                { run, hop: { $gte: 4 } },
                { orderBy: { hop: run.packetType === RunPacketType.REQUEST ? 'ASC' : 'DESC' } }
            );

            return hops[Math.floor((hops.length - 1) / distanceToDestination)].address;
        }
    }

    /**
     * Helper function that automatically logs whenever new hops are being created.
     */
    private async createHop(data: RequiredEntityData<RunHop>) {
        const terminalId = typeof data.terminal === 'object' ? (data.terminal as Terminal).id : data.terminal;
        this.logger.debug(`Creating hop to terminal "${terminalId}", address "${data.address?.ip || null}" and type "${data.type}"`);
        return this.orm.em.create(RunHop, data);
    }
}   