import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import Run from './index.entity';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export default class RunSubscriber implements EventSubscriber<Run> {
    constructor(
        em: EntityManager,
        @InjectQueue('default')
        private queue: Queue,
    ) {
        em.getEventManager().registerSubscriber(this);
    }

    getSubscribedEntities(): EntityName<Run>[] {
        return [Run];
    }

    afterCreate(args: EventArgs<Run>): void | Promise<void> {
        this.queue.add('traceroute', args.entity.id);
        this.queue.add('website', args.entity.id);
    }
}