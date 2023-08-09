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
    ],
    controllers: [AppController],
    providers: [
        PresenceManager,
        PubSubManager,
        AppService,
        AutoMigrationService,
        DatabasePragmasService,
        AddressesResolver,
        TerminalsResolver,
        AddressSubscriber,
        TerminalSubscriber,
    ],
    exports: [
        PubSubManager,
        PresenceManager,
    ],
})
export class AppModule { }