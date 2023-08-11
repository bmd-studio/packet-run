import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@mikro-orm/nestjs';
import RunModel from './model';
import Run from './index.entity';
import { EntityRepository } from '@mikro-orm/core';

@Resolver(() => RunModel)
export default class RunsResolver {
    constructor(
        @InjectRepository(Run)
        private readonly repository: EntityRepository<Run>
    ) {}

    @Query(() => RunModel)
    async run(@Args('id') id: string) {
        return this.repository.findOneOrFail({ id }, { 
            populate: ['hops', 'destination', 'terminal', 'route', 'route.address'],
        });
    }

    @Mutation(() => RunModel)
    async createRun(
        @Args('url') url: string,
        @Args('nfcId') nfcId: string,
    ) {
        const run = this.repository.create({ url, nfcId });
        await this.repository.flush();
        return run;
    }
}