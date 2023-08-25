import { BehaviorSubject } from 'rxjs';
import Terminal, { fetchAllTerminals } from './index.entity';
import PubSubManager from '../../providers/PubSubManager';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import Presence from '../presence/index.entity';

/**
 * This observable contains an array of all terminals with relations from the database.
 * This is used to updated the dashboard. Whenever a related entity is changed,
 * the full object should be retrieved from scratch in the database using `fetchAllTerminals`
 */
export const terminalsObservable = new BehaviorSubject<Terminal[] | null>(null);

@Injectable()
export default class TerminalSubscriber implements EventSubscriber<Terminal | Presence> {
    constructor(
        private em: EntityManager,
        private readonly pubSub: PubSubManager,
    ) {
        em.getEventManager().registerSubscriber(this);
        this.initialize();
    }

    async initialize() {
        terminalsObservable.next(await fetchAllTerminals(this.em));
    }

    getSubscribedEntities(): EntityName<Terminal | Presence>[] {
        return [Terminal, Presence];
    }

    async afterUpdate({ entity, meta }: EventArgs<Terminal | Presence>) {
        if (meta.class === Terminal) {
            this.pubSub.publish(Terminal, entity.id, entity);
        }
        terminalsObservable.next(await fetchAllTerminals(this.em));
    }

    async afterUpsert({ entity, meta }: EventArgs<Terminal | Presence>) {
        if (meta.class === Terminal) {
            this.pubSub.publish(Terminal, entity.id, entity);
        }
        terminalsObservable.next(await fetchAllTerminals(this.em));
    }

    async afterDelete(): Promise<void> {
        terminalsObservable.next(await fetchAllTerminals(this.em));
    }

    async afterCreate(): Promise<void> {
        terminalsObservable.next(await fetchAllTerminals(this.em));
    }
}