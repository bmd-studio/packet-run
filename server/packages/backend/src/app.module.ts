import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import AutoMigrationService from './providers/AutoMigrationsService';
import { GraphQLModule } from '@nestjs/graphql';
import PubSubManager from './providers/PubSubManager';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import AddressesResolver from './entities/address/resolver';
import Address from './entities/address/index.entity';
import Run from './entities/run/index.entity';
import Terminal from './entities/terminal/index.entity';
import CustomApolloDriver from './lib/CustomApolloDriver';
import AddressSubscriber from './entities/address/subscriber';
import TerminalsResolver from './entities/terminal/resolver';
import DatabasePragmasService from './providers/DatabasePragmasService';
import TerminalSubscriber from './entities/terminal/subscriber';
import PresenceManager from './providers/PresenceManager';
import { BullModule } from '@nestjs/bullmq';
import JobProcessor from './jobs';
import RunsResolver from './entities/run/resolver';
import RunSubscriber from './entities/run/subscriber';
import { ConfigModule } from '@nestjs/config';
import { InMemoryCache, IpregistryClient } from '@ipregistry/client';
import { JobsResolver } from './entities/job/resolver';
import { ServeStaticModule } from '@nestjs/serve-static';
import TracerouteHop from './entities/tracerouteHop/index.entity';
import RunHop from './entities/runHop/index.entity';
import RoutingService from './providers/RoutingService';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        MikroOrmModule.forRoot({
            entities: ['./dist/entities/**/index.entity.js'],
            entitiesTs: ['./src/entities/**/index.entity.ts'],
            dbName: './data/packet-run.db',
            type: 'better-sqlite',
            allowGlobalContext: true,
            debug: false,
        }),
        MikroOrmModule.forFeature([Address, TracerouteHop, RunHop, Run, Terminal]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: CustomApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/data/schema.graphql'),
            subscriptions: {
                'graphql-ws': true,
            },
        }),
        BullModule.forRoot({
            connection: {
                host: '127.0.0.1',
            },
        }),
        BullModule.registerQueue({
            name: 'default',
            defaultJobOptions: {
                attempts: 10,
                backoff: {
                    type: 'exponential',
                    delay: 2500,
                },
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'data', 'images'),
            serveRoot: '/images',
        }),
    ],
    controllers: [AppController],
    providers: [
        /** Providers */
        AutoMigrationService,
        DatabasePragmasService,
        PresenceManager,
        PubSubManager,
        RoutingService,
        /** Resolvers */
        AddressesResolver,
        TerminalsResolver,
        RunsResolver,
        JobsResolver,
        /** Subscribers */
        AddressSubscriber,
        TerminalSubscriber,
        RunSubscriber,
        /** Misc */
        AppService,
        JobProcessor,
        { 
            provide: IpregistryClient, 
            useFactory: () => {
                if (!process.env.IPREGISTRY_API_KEY) {
                    const logger = new Logger('IpRegistryClient');
                    logger.warn('Could not find IPREGISTRY_API_KEY environment variable...');
                }
                return new IpregistryClient(process.env.IPREGISTRY_API_KEY, new InMemoryCache(256));
            },
        },
    ],
    exports: [
        PubSubManager,
        PresenceManager,
    ],
})
export class AppModule { }