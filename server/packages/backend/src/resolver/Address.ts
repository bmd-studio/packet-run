import { InjectRepository } from '@mikro-orm/nestjs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import AddressModel from '../models/Address';
import Address from '../entities/Address';
import { EntityRepository } from '@mikro-orm/better-sqlite';

@Resolver(() => AddressModel)
export default class AddressesResolver {
    constructor(
        @InjectRepository(Address)
        private readonly repository: EntityRepository<Address>
    ) {}

    @Query(() => AddressModel)
    async address(@Args('ip') ip: string) {
        return this.repository.findOneOrFail({ ip });
    }
}