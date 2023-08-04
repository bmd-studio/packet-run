import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import AutoMigrationService from './lib/AutoMigrationsService';
import { GraphQLModule } from '@nestjs/graphql';
import PubSubManager from './lib/PubSubManager';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import AddressesResolver from './resolver/Address';
import Address from './entities/Address';
import Hop from './entities/Hop';
import Run from './entities/Run';
import Terminal from './entities/Terminal';
import CustomApolloDriver from './lib/CustomApolloDriver';

@Global()
@Module({
    imports: [
        MikroOrmModule.forRoot({
            entities: ['./dist/entities'],
            entitiesTs: ['./src/entities'],
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
    ],
    exports: [PubSubManager],
})
export class AppModule { }