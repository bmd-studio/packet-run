import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@mikro-orm/nestjs';
import RunModel from './model';
import Run from './index.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import Terminal, { TerminalType } from '../terminal/index.entity';
import { sample } from 'lodash';
import RunHop from '../runHop/model';
import Address from '../address/model';
import { RunHopStatus } from '../runHop/index.entity';

@Resolver(() => RunModel)
export default class RunsResolver {
    constructor(
        @InjectRepository(Run)
        private readonly repository: EntityRepository<Run>,
        private readonly em: EntityManager,
    ) {}

    @Query(() => RunModel)
    async run(@Args('id') id: string) {
        return this.repository.findOneOrFail({ id }, { 
            populate: ['hops', 'destination', 'terminal'],
        });
    }

    @Mutation(() => RunModel)
    async createRun(
        @Args('url') url: string,
        @Args('nfcId') nfcId: string,
    ) {
        // Retrieve all servers so we can already set the destination for this
        // run
        // TODO: Track the server from the previous run so we can loadbalance
        // new runs
        const terminals = await this.em.find(Terminal, { type: TerminalType.SERVER });

        // Create the run
        const run = this.repository.create({ url, nfcId, server: sample(terminals) });
        await this.repository.flush();

        return run;
    }

    @ResolveField(() => [RunHop])
    async availableHops(@Parent() run: Run) {
        const hops = await run.hops.loadItems({ populate: ['address' ]});
        return hops.filter((h) => h.hop === run.currentHopIndex);
    }

    @ResolveField(() => RunHop)
    async currentHop(@Parent() run: Run) {
        const hops = await run.hops.loadItems({ populate: ['address']});
        return hops.find((h) => (
            h.hop === run.currentHopIndex - 1 && h.status === RunHopStatus.ACTUAL)
        );
    }

    @ResolveField(() => Address, { nullable: true })
    async origin(@Parent() run: Run) {
        const hop = await run.tracerouteHops.loadItems({ where: { hop: { $eq: 1 } }, populate: ['address' ]})
        return hop[0]?.address ?? null;
    }
}