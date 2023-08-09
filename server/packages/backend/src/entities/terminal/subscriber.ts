import { BehaviorSubject } from 'rxjs';
import Terminal, { fetchAllTerminals } from './index.entity';
import PubSubManager from '../../providers/PubSubManager';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';

/**
 * This observable contains an array of all terminals with relations from the database.
 * This is used to updated the dashboard. Whenever a related entity is changed,
 * the full object should be retrieved from scratch in the database using `fetchAllTerminals`
 */
export const terminalsObservable = new BehaviorSubject<Terminal[] | null>(null);

@Injectable()
export default class TerminalSubscriber implements EventSubscriber<Terminal> {
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

    getSubscribedEntities(): EntityName<Terminal>[] {
        return [Terminal];
    }

    async afterUpdate({ entity }: EventArgs<Terminal>) {
        this.pubSub.publish(Terminal, entity.id, entity);
        terminalsObservable.next(await fetchAllTerminals(this.em));
    }

    async afterUpsert({ entity }: EventArgs<Terminal>) {
        this.pubSub.publish(Terminal, entity.id, entity);
        terminalsObservable.next(await fetchAllTerminals(this.em));
    }
}