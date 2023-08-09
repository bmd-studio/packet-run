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
import PubSubManager from '../providers/PubSubManager';
import PresenceManager from 'src/providers/PresenceManager';

interface WebsocketWithPresence extends ws.WebSocket {
    isAlive: boolean;
}

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

    /** This map contains references to all intervals that are registered for
     * connecting sockets. Each connected socket has an individual interval that
     * maintains a heartbeat or else disconnects the socket (so it can reconnect). */
    private intervals = new Map<string, NodeJS.Timer>;

    constructor(
        private readonly options: GqlSubscriptionServiceOptions,
        private readonly httpServer: any,
        private readonly pubsub: PubSubManager,
        private readonly presence: PresenceManager,
    ) {
        this.wss = new ws.Server({
            path:
                (this.options['graphql-ws'] as GraphQLWsSubscriptionsConfig)?.path ??
                this.options.path,
            noServer: true,
        });
        this.initialize();
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
                    onConnect: (ctx) => {
                        // Retrieve the websocket id and the socket itself
                        const socketId = ctx.extra.request.headers['sec-websocket-key'];
                        const socket = ctx.extra.socket as WebsocketWithPresence;

                        // We've just connected so we default the `isAlive`
                        // state to true
                        socket.isAlive = true;

                        // Whenever a socket responds to our ping, we deal with
                        // this response in this handler
                        socket.on('pong', () => {
                            // Set the isAlive flag to true, so that we know the
                            // socket responded next time the interval runs
                            socket.isAlive = true;

                            // Also propagate this event to the presence manager
                            // so we can store the result in the database
                            this.presence.pong(socketId);
                        });

                        // Do a heartbeat check every x seconds
                        const intervalId = setInterval(() => {
                            // GUARD: If the socket hasn't responded since the
                            // last time we sent out a ping, we assume it's
                            // disconnected and terminate it
                            if (!socket.isAlive) {
                                return socket.terminate();
                            }

                            // If it is still alive, we start a new cycle for
                            // the heartbeat
                            socket.isAlive = false;
                            socket.ping();
                        }, 10_000);

                        // Store the interval id so we can clear once the socket disconnects
                        this.intervals.set(socketId, intervalId);
                    },
                    onDisconnect: (ctx) => {
                        // Retrieve the socket id
                        const socketId = ctx.extra.request.headers['sec-websocket-key'];

                        // Propagate the disconnection event to both the pubsub
                        // manager and presence manager so they can do their own cleanup.
                        this.pubsub.disconnect(socketId);
                        this.presence.disconnect(socketId);

                        // Then, clear the interval and delete the entry from
                        // our registry
                        clearInterval(this.intervals.get(socketId));
                        this.intervals.delete(socketId);
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