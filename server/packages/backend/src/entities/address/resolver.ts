import { InjectRepository } from '@mikro-orm/nestjs';
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import AddressModel from './model';
import Address from './index';
import { EntityRepository } from '@mikro-orm/better-sqlite';
import PubSubManager from '../../lib/PubSubManager';
import WebsocketId from '../../lib/WebsocketId';

@Resolver(() => AddressModel)
export default class AddressesResolver {
    constructor(
        @InjectRepository(Address)
        private readonly repository: EntityRepository<Address>,
        private readonly pubsub: PubSubManager,
    ) {}

    @Query(() => AddressModel, { nullable: true })
    async address(@Args('ip') ip: string) {
        return this.repository.findOneOrFail({ ip });
    }

    @Subscription(() => AddressModel, { nullable: true })
    async listen(
        @Args('ip') ip: string,
        @WebsocketId() subscriptionId: string,
    ) {
        return this.pubsub.subscribe(
            AddressModel,
            ip,
            () => this.repository.findOne({ ip }),
            subscriptionId,
            'listen',
        );
    }
}