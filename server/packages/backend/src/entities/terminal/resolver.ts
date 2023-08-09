import { Args, Context, Query, Resolver, Subscription } from '@nestjs/graphql';
import Terminal from './model';
import { InjectRepository } from '@mikro-orm/nestjs';
import TerminalEntity, { fetchAllTerminals } from './index.entity';
import { EntityRepository } from '@mikro-orm/better-sqlite';
import PubSubManager from '../../providers/PubSubManager';
import WebsocketId, { GraphQLContext } from '../../lib/WebsocketId';
import { terminalsObservable } from './subscriber';
import { map } from 'rxjs';
import PresenceManager from '../../providers/PresenceManager';
import { EntityManager } from '@mikro-orm/core';

@Resolver(() => Terminal)
export default class TerminalsResolver {
    constructor(
        @InjectRepository(TerminalEntity)
        private readonly repository: EntityRepository<TerminalEntity>,
        private readonly em: EntityManager,
        private readonly pubsub: PubSubManager,
        private readonly presence: PresenceManager,
    ) {}

    @Query(() => Terminal, { nullable: true })
    async terminal(@Args('id') id: number) {
        return this.repository.findOneOrFail({ id }, { populate: ['connectionsFrom', 'connectionsTo', 'run', 'run.hops', 'run.route', 'presences'] });
    }

    @Query(() => [Terminal])
    async terminals() {
        return fetchAllTerminals(this.em);
    }

    @Subscription(() => Terminal, { nullable: true })
    async registerTerminal(
        @Args('id') id: number,
        @WebsocketId() subscriptionId: string,
        @Context() context: { req: GraphQLContext }
    ) {
        this.presence.register(
            subscriptionId,
            id,
            context.req.extra.request.socket.remoteAddress
        );
        return this.pubsub.subscribe(
            TerminalEntity,
            id,
            () => this.repository.findOne({ id }),
            subscriptionId,
            'registerTerminal',
        );
    }

    @Subscription(() => [Terminal])
    async allTerminals() {
        return terminalsObservable.pipe(map((allTerminals) => ({ allTerminals })));
    }
}