import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import Terminal from './model';
import { InjectRepository } from '@mikro-orm/nestjs';
import TerminalEntity, { TerminalStatus, TerminalType, defaultTerminalRelations, fetchAllTerminals } from './index.entity';
import { EntityRepository } from '@mikro-orm/better-sqlite';
import PubSubManager from '../../providers/PubSubManager';
import WebsocketId, { GraphQLContext } from '../../lib/WebsocketId';
import { terminalsObservable } from './subscriber';
import { map } from 'rxjs';
import PresenceManager from '../../providers/PresenceManager';
import { EntityManager } from '@mikro-orm/core';
import Run, { RunPacketType } from '../run/index.entity';
import RunHop, { RunHopStatus } from '../runHop/index.entity';
import RoutingService from '../../providers/RoutingService';

@Resolver(() => Terminal)
export default class TerminalsResolver {
    constructor(
        @InjectRepository(TerminalEntity)
        private readonly repository: EntityRepository<TerminalEntity>,
        private readonly em: EntityManager,
        private readonly pubsub: PubSubManager,
        private readonly presence: PresenceManager,
        private readonly routing: RoutingService,
    ) {}

    @Query(() => Terminal, { nullable: true })
    async terminal(@Args('id') id: number) {
        return this.repository.findOneOrFail(
            { id },
            { 
                populate: [
                    'connectionsFrom',
                    'connectionsTo',
                    'run',
                    'run.hops',
                    'presences',
                ], 
            }
        );
    }

    @Query(() => [Terminal])
    async terminals() {
        return fetchAllTerminals(this.em);
    }

    @Subscription(() => Terminal, { nullable: true })
    async registerTerminal(
        @Args('id') id: number,
        @WebsocketId() subscriptionId: string,
        @Context() context: { req: GraphQLContext }
    ) {
        this.presence.register(
            subscriptionId,
            id,
            context.req.extra.request.socket.remoteAddress
        );
        return this.pubsub.subscribe(
            TerminalEntity,
            id,
            () => this.repository.findOne({ id }, { populate: defaultTerminalRelations, cache: false, disableIdentityMap: true }),
            subscriptionId,
            'registerTerminal',
        );
    }

    @Subscription(() => [Terminal])
    async allTerminals() {
        return terminalsObservable.pipe(map((allTerminals) => ({ allTerminals })));
    }

    @Mutation(() => Boolean, { nullable: true, description: 'Indicate that a particular terminal has scanned an NFC tag. This should result in the terminal status being set to `SCANNING_NFC`' })
    async scanNfcForTerminal(
        @Args('terminalId') terminalId: number,
        @Args('nfcId') nfcId: string,
    ) {
        // Retrieve the terminal from the database
        const terminal = await this.repository.findOneOrFail({ id: terminalId });

        // GUARD: Check that we make the state transition from a valid state
        if (terminal.status !== TerminalStatus.IDLE) {
            throw new Error(`StateError: Cannot transition from "${terminal.status}" to "SCANNING_NFC" for terminal "${terminalId}"`);
        }

        // Retrieve the run
        const run = await this.em.findOneOrFail(
            Run,
            { nfcId },
            { 
                populate: [
                    'hops',
                    'hops.terminal',
                    'destination',
                    'terminal',
                    'terminal.connectionsTo',
                    'terminal.connectionsTo.to.id',
                    'tracerouteHops',
                    'tracerouteHops.id',
                    'server',
                    'server.id',
                ],
                orderBy: [
                    { createdAt: 'DESC' },
                ],
            }
        );

        // Generate new hops for the terminal
        await this.routing.process(run, terminal);

        // Set the terminal to the desired state
        terminal.status = TerminalStatus.SCANNING_NFC;
        terminal.run = run;
        await this.em.flush();

        return true;
    }

    @Mutation(() => Boolean, { nullable: true, description: 'Used for `SENDER` and `SERVER` terminal types. These terminals may transform a packet using a particular interaction. Depending on `isPacketCreated`, this should result in the terminal status being set to `CREATING_PACKET` or `CREATED_PACKET`' })
    async createReturnPacketForTerminal(
        @Args('terminalId') terminalId: number,
        @Args('isPacketCreated', { description: 'The before/after packet creation states are tracked seperately. If `isPacketCreated` is set to `false`, the state will be set to `CREATING_PACKET`, whereas if `isPacketCreated` is `true`, the terminal state will be set to `CREATED_PACKET`'  }) isPacketCreated: boolean,
    ) {
        // Retrieve the terminal form the database
        const terminal = await this.repository.findOneOrFail({ id: terminalId });

        // GUARD: Check if the terminal is the correct type
        if (terminal.type !== TerminalType.SENDER
            && terminal.type !== TerminalType.SERVER) {
            throw new Error(`StateError: Cannot transition terminal with id "${terminalId}" to next state because type doesn't match "SENDER" or "SERVER" (type given: "${terminal.type}")`);
        }

        // GUARD: Check whether the terminal is in the right state
        if (isPacketCreated) {
            if (terminal.status !== TerminalStatus.CREATING_PACKET) {
                throw new Error(`StateError: Cannot transition terminal with id "${terminalId}" to new state "CREATING_PACKET", because terminal status is not "SCANNING_NFC" (status given: ${terminal.status})`);
            }
        } else {
            if (terminal.status !== TerminalStatus.SCANNING_NFC) {
                throw new Error(`StateError: Cannot transition terminal with id "${terminalId}" to new state "CREATED_PACKET", because terminal status is not "CREATING_PACKET" (status given: ${terminal.status})`);
            }
        }

        // GUARD: Check whether a run is associated with the terminal
        if (!terminal.run) {
            throw new Error(`Cannot find run for terminal with id "${terminal.id}"`);
        }

        // GUARD: Check whether the run may actually perform transformations
        const hop = await this.em.findOneOrFail(RunHop, {
            hop: terminal.run.currentHopIndex - 1,
            status: RunHopStatus.ACTUAL,
            run: terminal.run,
        });
        if (!hop.mayPerformTransformation) {
            throw new Error('StateError: cannot transform packet before reaching a server in a valid manner');
        }

        // Assign the status to terminal
        terminal.status = isPacketCreated
            ? TerminalStatus.CREATED_PACKET
            : TerminalStatus.CREATING_PACKET;

        if (isPacketCreated) {
            terminal.run.packetType = RunPacketType.RESPONSE;
        }

        // Save to database
        await this.repository.flush();

        return true;
    }

    @Mutation(() => Boolean, { nullable: true, description: 'Restore a particular terminal to the `IDLE` status' })
    async setTerminalToIdle(
        @Args('terminalId') terminalId: number,
    ) {
        // Retrieve the terminal form the database
        const terminal = await this.repository.findOneOrFail({ id: terminalId });

        // Set the status and run to the desired states
        terminal.status = TerminalStatus.IDLE;
        terminal.run = null;

        // Update the database
        await this.em.flush();

        return true;
    }

    @Mutation(() => Boolean, { nullable: true, description: 'Check whether an URL is valid and reachable' })
    async validateHost(
        @Args('host') host: string,
    ) {
        const url = `https://${host}`;

        try {
            // Attempt a HEAD request fisrt
            const response = await fetch(url, { method: 'HEAD', mode: 'no-cors', redirect: 'manual' });

            // GUARD: Check for error messages
            if (response.status >= 400) {
                // Request again using GET, as some servers block HEAD requests
                const response = await fetch(url, { mode: 'no-cors', redirect: 'manual' });
                return response.status >= 200 && response.status < 400; 
            }

            return response.status >= 200 && response.status < 400;
        } catch(e) {
            return false;
        }
    }
}