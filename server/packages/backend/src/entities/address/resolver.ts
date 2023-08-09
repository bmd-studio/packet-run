import { InjectRepository } from '@mikro-orm/nestjs';
import { Resolver } from '@nestjs/graphql';
import AddressModel from './model';
import Address from './index.entity';
import { EntityRepository } from '@mikro-orm/better-sqlite';
import PubSubManager from '../../providers/PubSubManager';
// import WebsocketId from '../../lib/WebsocketId';

@Resolver(() => AddressModel)
export default class AddressesResolver {
    constructor(
        @InjectRepository(Address)
        private readonly repository: EntityRepository<Address>,
        private readonly pubsub: PubSubManager,
    ) {}

    // @Query(() => AddressModel, { nullable: true })
    // async address(@Args('ip') ip: string) {
    //     return this.repository.findOneOrFail({ ip });
    // }

    // @Subscription(() => AddressModel, { nullable: true })
    // async listen(
    //     @Args('ip') ip: string,
    //     @WebsocketId() subscriptionId: string,
    // ) {
    //     return this.pubsub.subscribe(
    //         AddressModel,
    //         ip,
    //         () => this.repository.findOne({ ip }),
    //         subscriptionId,
    //         'listen',
    //     );
    // }

    // @Mutation(() => Boolean, { nullable: true })
    // async updateAddress(
    //     @Args('ip') ip: string,
    // ) {
    //     const address = await this.repository.findOneOrFail({ ip });
    //     address.updatedAt = new Date();
    //     await this.repository.flush();
    //     return true;
    // }
}