import { Global, Module } from '@nestjs/common';
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
import Hop from './entities/hop/index.entity';
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

@Global()
@Module({
    imports: [
        MikroOrmModule.forRoot({
            entities: ['./dist/entities/**/index.entity.js'],
            entitiesTs: ['./src/entities/**/index.entity.ts'],
            dbName: './database/packet-run.db',
            type: 'better-sqlite',
            allowGlobalContext: true,
            debug: true,
        }),
        MikroOrmModule.forFeature([Address, Hop, Run, Terminal]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: CustomApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/data/schema.graphql'),
            subscriptions: {
                'graphql-ws': {
                    
                },
            },
        }),
        BullModule.forRoot({}),
        BullModule.registerQueue({
            name: 'default',
        }),
    ],
    controllers: [AppController],
    providers: [
        /** Providers */
        PresenceManager,
        PubSubManager,
        AutoMigrationService,
        DatabasePragmasService,
        /** Resolvers */
        AddressesResolver,
        TerminalsResolver,
        RunsResolver,
        /** Subscribers */
        AddressSubscriber,
        TerminalSubscriber,
        RunSubscriber,
        /** Misc */
        AppService,
        JobProcessor,
    ],
    exports: [
        PubSubManager,
        PresenceManager,
    ],
})
export class AppModule { }