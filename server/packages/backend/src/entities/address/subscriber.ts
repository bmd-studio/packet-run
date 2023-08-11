import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import Address from './index.entity';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export default class AddressSubscriber implements EventSubscriber<Address> {
    constructor(
        em: EntityManager,
        @InjectQueue('default')
        private readonly queue: Queue,
    ) {
        em.getEventManager().registerSubscriber(this);
    }

    getSubscribedEntities(): EntityName<Address>[] {
        return [Address];
    }

    async afterCreate(args: EventArgs<Address>) {
        //
    }

    async afterUpdate(args) {
        //
    }
}