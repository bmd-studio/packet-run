import { InjectRepository } from '@mikro-orm/nestjs';
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import AddressModel from '../models/Address';
import Address from '../entities/Address';
import { EntityRepository } from '@mikro-orm/better-sqlite';
import PubSubManager from '../lib/PubSubManager';
import WebsocketId from '../lib/WebsocketId';

@Resolver(() => AddressModel)
export default class AddressesResolver {
    constructor(
        @InjectRepository(Address)
        private readonly repository: EntityRepository<Address>,
        private readonly pubsub: PubSubManager,
    ) {}

    @Query(() => AddressModel)
    async address(@Args('ip') ip: string) {
        return this.repository.findOneOrFail({ ip });
    }

    @Subscription(() => AddressModel)
    async listen(
        @Args('ip') ip: string,
        @WebsocketId() subscriptionId: string,
    ) {
        return this.pubsub.subscribe(
            AddressModel,
            ip,
            () => this.repository.findOneOrFail({ ip }),
            subscriptionId
        );
    }
}