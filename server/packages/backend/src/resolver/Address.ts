import { InjectRepository } from '@mikro-orm/nestjs';
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import AddressModel from '../models/Address';
import Address from '../entities/Address';
import { EntityRepository } from '@mikro-orm/better-sqlite';
import { BehaviorSubject } from 'rxjs';

@Resolver(() => AddressModel)
export default class AddressesResolver {
    private observables = new Map<string, BehaviorSubject<{ listen: Address }>>();

    constructor(
        @InjectRepository(Address)
        private readonly repository: EntityRepository<Address>
    ) {}

    @Query(() => AddressModel)
    async address(@Args('ip') ip: string) {
        const address = await this.repository.findOneOrFail({ ip });

        if (this.observables.has(ip)) {
            console.log('HAS OBSERVABLE, UPDATE IT');
            this.observables.get(ip).next({ listen: address });
        } else {
            this.observables.set(ip, new BehaviorSubject({ listen: address }));
        }

        return address;
    }

    @Subscription(() => AddressModel, { nullable: true })
    async listen(@Args('ip') ip: string) {
        const address = await this.repository.findOneOrFail({ ip });

        if (!this.observables.has(ip)) {
            this.observables.set(ip, new BehaviorSubject({ listen: address }));
        } 

        return this.observables.get(ip);
    }
}