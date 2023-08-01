import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import AutoMigrationService from './lib/AutoMigrationsService';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import AddressesResolver from './resolver/Address';
import Address from './entities/Address';
import Hop from './entities/Hop';
import Run from './entities/Run';
import Terminal from './entities/Terminal';

@Module({
    imports: [
        MikroOrmModule.forRoot({
            entities: ['./dist/entities'],
            entitiesTs: ['./src/entities'],
            dbName: './data/packet-run.db',
            type: 'better-sqlite',
        }),
        MikroOrmModule.forFeature([Address, Hop, Run, Terminal]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/data/schema.graphql'),
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AutoMigrationService,
        AddressesResolver,
    ],
})
export class AppModule { }