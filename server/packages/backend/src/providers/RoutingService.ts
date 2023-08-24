import { Loaded, MikroORM } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { random, sample } from 'lodash';
import Address from '../entities/address/index.entity';
import Run, { RunPacketType } from '../entities/run/index.entity';
import RunHop, { RunHopStatus, RunHopType } from '../entities/runHop/index.entity';
import Terminal, { TerminalType } from '../entities/terminal/index.entity';
import TracerouteHop from '../entities/tracerouteHop/index.entity';
import { getPreviousHop, getTerminalWithShortestPath } from '../lib/RoutingUtils';

/**
 * This contains all logic that determines how packets are routed across our
 * fake internet.
 */
@Injectable()
export default class RoutingService {
    terminals: Loaded<Terminal, "connectionsTo">[];
    logger = new Logger(RoutingService.name);

    constructor(
        private orm: MikroORM
    ) {}

    /**
     * When a packet is scanned at a new terminal, we need to validate and
     * record which route has been taken by the user. Based on this, we will
     * also generate a new set of routes the user may take.
     */
    async process(run: Loaded<Run, "hops">, receivingTerminal: Terminal) {
        // Validate the path that was taken
        const hop = await this.orm.em.findOne(RunHop, {
            run, hop: run.currentHopIndex, terminal: receivingTerminal,
        });

        // GUARD: Check that the receiving terminal is actually a valid
        // destination for this particular run
        if (!hop) {
            throw new Error(`StateError: invalid terminal. The terminal with id "${receivingTerminal.id}" is not currently a destination for this run`);
        }

        // Update the hop to signify this was the path that is actually taken
        hop.status = RunHopStatus.ACTUAL;
        await this.orm.em.flush();

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
    }

    /**
     * Insert a hop that points to the previously visited terminal. 
     * NOTE: Don't forget to call `await this.em.flush()` after calling this function.
     */
    async insertPreviousHop(run: Run) {
        const previousHop = await getPreviousHop(run);

        this.orm.em.create(RunHop, {
            run,
            terminal: previousHop.terminal,
            type: RunHopType.PREVIOUS,
            address: previousHop.address,
            hop: run.currentHopIndex + 1,
        });
    }

    /**
     * This will generate hop options for the last hop. This is the hop that is
     * supposed to travel from the `gateway` to the `receiver`
     */
    private async generateGatewayHop(run: Run) {
        // Retrieve the relevant hops
        const [client, , internet] = await this.orm.em.find(TracerouteHop, { run, hop: { $lte: 3 }});

        // This is the hop to the internet
        this.orm.em.create(RunHop, {
            run,
            terminal: 6,
            type: run.packetType === RunPacketType.REQUEST 
                ? RunHopType.RECOMMENDED
                : RunHopType.PREVIOUS,
            address: internet.address,
            hop: run.currentHopIndex + 1,
        });

        // This is the hop back to the computer
        this.orm.em.create(RunHop, {
            run,
            terminal: 12,
            type: run.packetType === RunPacketType.REQUEST 
                ? RunHopType.PREVIOUS
                : RunHopType.RECOMMENDED,
            address: client.address,
            hop: run.currentHopIndex + 1,
        });

        // Save to the database
        await this.orm.em.flush();
    }

    /**
     * Generate the next hop from a server
     */
    private async generateServerHop(run: Run, currentHop: RunHop) {
        // GUARD: Check that we're at the destination server
        if (currentHop.address.ip === run.destination.ip) {
            const gateway = await this.orm.em.findOneOrFail(TracerouteHop, { run, hop: 2 });

            // If we are, we offer the wormhole option
            this.orm.em.create(RunHop, {
                run,
                terminal: 2,
                type: RunHopType.WORMHOLE,
                address: gateway.address,
                hop: run.currentHopIndex + 1,
            });
        } 

        // Always offer the option of going back
        this.insertPreviousHop(run);

        // Save to database
        await this.orm.em.flush();
    }

    /**
     * Generate the next set of hops for the current run. This will calculate
     * the next recommended hop and a set of alternative hops.
     */
    private async generateNextHops(run: Run) {
        // Retrieve the previous hop
        const previousHop = await getPreviousHop(run);

        // Create the previous hop
        // TODO: Only insert this after we can conclude that the previous hop is
        // not the recommended hop
        this.insertPreviousHop(run);

        // TODO: Check in the history of runhops for earlier occurences of the
        // next recommended hops so we can copy them.

        // Determine all options that don't route to the previous hop
        const terminals = run.terminal.connectionsTo.getItems()
            .filter((t) => t.id !== previousHop.terminal.id);

        // Calculate the shortest path to the destination terminal
        const { terminalId, route } = await getTerminalWithShortestPath(
            run,
            run.packetType === RunPacketType.RESPONSE ? TerminalType.RECEIVER : TerminalType.SERVER
        );

        // Pick a single router and make it the recommended router
        const index = run.currentHopIndex > 3 && route.length > 4
            ? terminals.findIndex((r) => r.id === terminalId)
            : random(terminals.length);

        // Extract the recommended router from the array
        let recommendedTerminal = terminals[index];
        let otherRouters = terminals.filter((t, i) => i !== index);

        // GUARD: Check if the selected recommended terminal is actually valid
        if ((recommendedTerminal.type === TerminalType.SERVER && previousHop.type !== RunHopType.RECOMMENDED)
            || (recommendedTerminal.type === TerminalType.GATEWAY && run.packetType !== RunPacketType.RESPONSE)
        ) {
            // If it isn't, mark this terminal as an invalid hop
            this.orm.em.create(RunHop, {
                run,
                terminal: recommendedTerminal,
                type: RunHopType.INVALID,
                // TODO: Retrieve next address
                address: await this.orm.em.upsert(Address, { ip: '0.0.0.0' }),
                hop: run.currentHopIndex + 1,
            });

            // Then, select a new terminal at random
            recommendedTerminal = sample(otherRouters);
            otherRouters = otherRouters.filter((t) => t.id !== recommendedTerminal.id);
        }

        // Create the recommended hop
        this.orm.em.create(RunHop, {
            run,
            terminal: recommendedTerminal,
            type: RunHopType.RECOMMENDED,
            // TODO: Retrieve next address
            address: await this.orm.em.upsert(Address, { ip: '0.0.0.0' }),
            hop: run.currentHopIndex + 1,
        });

        // All other routes become alternative routes
        await Promise.all(otherRouters.map(async (terminal) => {
            this.orm.em.create(RunHop, {
                run,
                terminal,
                type: RunHopType.ALTERNATIVE,
                // TODO: Retrieve alt address
                address: await this.orm.em.upsert(Address, { ip: '0.0.0.0' }),
                hop: run.currentHopIndex + 1,
            });
        }));
    }
}   