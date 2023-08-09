import { MikroORM } from '@mikro-orm/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Presence from '../entities/presence/index.entity';
import { EntityRepository } from '@mikro-orm/better-sqlite';
import Terminal, { TerminalStatus } from '../entities/terminal/index.entity';

/**
 * This class manages presence for the individual terminal subscriptions. 
 */
@Injectable()
export default class PresenceManager implements OnModuleInit {
    private logger = new Logger(PresenceManager.name);
    private repository: EntityRepository<Presence>;

    constructor(
        private readonly orm: MikroORM
    ) {
        this.repository = this.orm.em.getRepository(Presence);
    }

    async onModuleInit() {
        // Remove any remaining presences. They have become stale since the
        // application has been rebooted and any sockets have been disconnected.
        await this.repository.nativeDelete({});

        this.logger.log('✅ Cleaned up stale presence data.');
    }

    /**
     * Register a new terminal subscription so we can update the presence later
     */
    async register(websocketId: string, terminalId: number, ip: string) {
        // Create a new presence object
        this.repository.create({
            terminal: terminalId,
            websocketId,
            ip,
        });

        // Flush any outstanding transactions
        await this.orm.em.flush();

        const terminal = await this.orm.em.findOne(Terminal, { id: terminalId });
        if (terminal.status === TerminalStatus.OFFLINE) {
            terminal.status = TerminalStatus.IDLE;
            await this.orm.em.flush();
        }
    }

    /**
     * Transform a single pong into an update for 
     */
    async pong(websocketId: string) {
        await this.repository.nativeUpdate({ websocketId }, { lastSeenAt: new Date() });
    }

    /**
     * Process a disconnect event from a websocket
     */
    async disconnect(websocketId: string) {
        // Retrieve the presence object for this id
        const presence = await this.repository.findOne({ websocketId }, { populate: ['terminal']});

        // Then, delete it
        await this.repository.nativeDelete({ websocketId });

        // Retrieve the remaining count of presences for the associated terminal id
        const count = await this.repository.count({ terminal: presence.terminal.id });

        if (count === 0) {
            // If there are no presences left, set the terminal status to offline
            await this.orm.em.getRepository(Terminal)
                .nativeUpdate({ id: presence.terminal.id }, { status: TerminalStatus.OFFLINE })
        }
    }
}