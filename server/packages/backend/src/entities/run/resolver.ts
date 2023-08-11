import { Args, Mutation, Resolver } from '@nestjs/graphql';
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