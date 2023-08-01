import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import AutoMigrationService from './lib/AutoMigrationsService';

@Module({
    imports: [
        MikroOrmModule.forRoot({
            entities: ['./dist/entities'],
            entitiesTs: ['./src/entities'],
            dbName: './data/packet-run.db',
            type: 'better-sqlite',
            autoLoadEntities: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AutoMigrationService],
})
export class AppModule { }