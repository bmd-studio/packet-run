import { SubscriptionConfig, GraphQLWsSubscriptionsConfig } from '@nestjs/graphql';
import {
    execute as graphqlExecute,
    GraphQLSchema,
    subscribe as graphqlSubscribe,
} from 'graphql';
import {
    Disposable,
    ServerOptions,
} from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import * as ws from 'ws';
import PubSubManager from './PubSubManager';

export interface GqlSubscriptionServiceOptions extends SubscriptionConfig {
    schema: GraphQLSchema;
    execute?: typeof graphqlExecute;
    subscribe?: typeof graphqlSubscribe;
    path?: string;
    context?: ServerOptions['context'];
}

export default class CustomGqlSubscriptionService {
    private readonly wss: ws.Server<typeof ws & { isAlive: boolean }>;
    private wsGqlDisposable: Disposable;

    constructor(
        private readonly options: GqlSubscriptionServiceOptions,
        private readonly httpServer: any,
        private readonly pubsub: PubSubManager,
    ) {
        this.wss = new ws.Server({
            path:
                (this.options['graphql-ws'] as GraphQLWsSubscriptionsConfig)?.path ??
                this.options.path,
            noServer: true,
        });
        this.initialize();
        this.pubsub = pubsub;
    }

    private initialize() {
        const { execute = graphqlExecute, subscribe = graphqlSubscribe } =
            this.options;

        if ('graphql-ws' in this.options) {
            const graphqlWsOptions =
                this.options['graphql-ws'] === true ? {} : this.options['graphql-ws'];

            this.wsGqlDisposable = useServer(
                {
                    schema: this.options.schema,
                    execute,
                    subscribe,
                    context: this.options.context,
                    ...graphqlWsOptions,
                    onDisconnect: (ctx) => {
                        this.pubsub.disconnect(ctx.extra.request.headers['sec-websocket-key']);
                    },
                },
                this.wss,
            );
        }

        this.httpServer.on('upgrade', (req, socket, head) => {
            if (req.url?.startsWith(this.wss.options.path)) {
                this.wss.handleUpgrade(req, socket, head, (ws) => {
                    this.wss.emit('connection', ws, req);
                });
            }
        });
    }

    async stop() {
        await this.wsGqlDisposable?.dispose();
    }
}