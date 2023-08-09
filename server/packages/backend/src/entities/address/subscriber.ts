import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import Address from './index.entity';
import PubSubManager from '../../providers/PubSubManager';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class AddressSubscriber implements EventSubscriber<Address> {
    constructor(
        em: EntityManager,
        private readonly pubSub: PubSubManager,
    ) {
        em.getEventManager().registerSubscriber(this);
    }

    getSubscribedEntities(): EntityName<Address>[] {
        return [Address];
    }

    async afterUpdate({ entity }: EventArgs<Address>) {
        this.pubSub.publish(Address, entity.ip, entity);
    }

    async afterUpsert({ entity }: EventArgs<Address>) {
        this.pubSub.publish(Address, entity.ip, entity);
    }
}