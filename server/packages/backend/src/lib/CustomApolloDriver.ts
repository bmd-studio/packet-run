import { Injectable } from '@nestjs/common';
import {
    extend,
    SubscriptionConfig,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import CustomGqlSubscriptionService from './CustomSubscriptionService';
import { ModulesContainer } from '@nestjs/core';
import PubSubManager from '../providers/PubSubManager';
import PresenceManager from '../providers/PresenceManager';

@Injectable()
export default class CustomApolloDriver extends ApolloDriver {
    constructor(
        modulesContainer: ModulesContainer,
        private readonly pubSubManager: PubSubManager,
        private readonly presenceManager: PresenceManager,
    ) {
        super(modulesContainer);
    }

    public async start(options: ApolloDriverConfig) {
        options.plugins = extend(
            options.plugins || [],
            // @ts-expect-error It's set to private, but it really isn't
            this.pluginsExplorerService.explore(options),
        );

        if (options.definitions && options.definitions.path) {
            await this.graphQlFactory.generateDefinitions(
                printSchema(options.schema),
                options,
            );
        }

        await this.registerServer(options);

        if (options.installSubscriptionHandlers || options.subscriptions) {
            const subscriptionsOptions: SubscriptionConfig =
                options.subscriptions || { 'subscriptions-transport-ws': {} };
            // @ts-expect-error It's incorrectly set to private property
            this._subscriptionService = new CustomGqlSubscriptionService(
                {
                    schema: options.schema,
                    path: options.path,
                    context: options.context,
                    ...subscriptionsOptions,
                },
                this.httpAdapterHost.httpAdapter?.getHttpServer(),
                this.pubSubManager,
                this.presenceManager,
            );
        }
    }
}