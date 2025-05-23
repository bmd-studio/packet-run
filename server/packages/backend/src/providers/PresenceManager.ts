import { MikroORM } from '@mikro-orm/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Presence from '../entities/presence/index.entity';
import { EntityRepository } from '@mikro-orm/better-sqlite';

/**
 * This class manages presence for the individual terminal subscriptions. 
 */
@Injectable()
export default class PresenceManager implements OnModuleInit {
    private logger = new Logger(PresenceManager.name);
    private repository: EntityRepository<Presence>;

    /** This will keep a reference to all websocketIds that have been
     * registered, so we don't update presence for any subscriptions that have
     * not been properly registered.  */
    private registry = new Set<string>;

    constructor(
        private readonly orm: MikroORM,
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

        // Register the websocketId
        this.registry.add(websocketId);

        // Flush any outstanding transactions
        await this.orm.em.flush();
    }

    /**
     * Transform a single pong into an update for 
     */
    async pong(websocketId: string) {
        // GUARD: Check that the websocket has been registered before
        if (!this.registry.has(websocketId)) {
            return;
        }

        await this.repository.nativeUpdate({ websocketId }, { lastSeenAt: new Date() });
    }

    /**
     * Process a disconnect event from a websocket
     */
    async disconnect(websocketId: string) {
        // GUARD: Check that the websocket has been registered before
        if (!this.registry.has(websocketId)) {
            return;
        }
        
        // Retrieve the presence object for this id
        const presence = await this.repository.findOne({ websocketId }, { populate: ['terminal']});

        // GUARD: Check that we actually managed to retrieve the presence
        if (!presence) {
            return;
        }

        // Then, delete it
        await this.orm.em.removeAndFlush(presence);
    }
}