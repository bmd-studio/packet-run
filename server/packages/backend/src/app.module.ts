import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import AutoMigrationService from './lib/AutoMigrationsService';
import { GraphQLModule } from '@nestjs/graphql';
import PubSubManager from './lib/PubSubManager';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import AddressesResolver from './entities/address/resolver';
import Address from './entities/address';
import Hop from './entities/Hop';
import Run from './entities/Run';
import Terminal from './entities/Terminal';
import CustomApolloDriver from './lib/CustomApolloDriver';
import AddressSubscriber from './entities/address/subscriber';

@Global()
@Module({
    imports: [
        MikroOrmModule.forRoot({
            entities: [Address, Hop, Run, Terminal],
            dbName: './database/packet-run.db',
            type: 'better-sqlite',
            allowGlobalContext: true,
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
        PubSubManager,
        AppService,
        AutoMigrationService,
        AddressesResolver,
        AddressSubscriber,
    ],
    exports: [PubSubManager],
})
export class AppModule { }