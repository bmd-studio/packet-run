import { MikroORM } from '@mikro-orm/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

/**
 * Will attempt to automatically run any migrations on application initialisation.
 */
@Injectable()
export default class AutoMigrationService implements OnModuleInit {
    private readonly logger = new Logger(AutoMigrationService.name);

    constructor(private readonly orm: MikroORM) { }

    async onModuleInit() {
        this.logger.log('📙 Attempting to run any migrations...');

        // Run any mgirations
        const migrations = await this.orm.getMigrator().up();

        // GUARD: Change log message depending on whether any migrations were run
        if (migrations.length) {
            const names = migrations.map((m) => m.name);
            this.logger.log(`✅ Successfully ran ${migrations.length} migration${migrations.length > 1 ? 's' : ''}: "${names.join('","')}"`)
        } else {
            this.logger.log('✅ No migrations necessary, database up-to-date.')
        }
    }
}
