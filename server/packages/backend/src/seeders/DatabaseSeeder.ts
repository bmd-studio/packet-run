import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TerminalSeeder } from './TerminalSeeder';

export class DatabaseSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        return this.call(em, [
            TerminalSeeder,
        ])
    }

}
