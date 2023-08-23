import { Migration } from '@mikro-orm/migrations';

export class Migration20230823093455 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `run` add column `server_id` integer not null constraint `run_server_id_foreign` references `terminal` (`id`) on update cascade;');
        this.addSql('create index `run_server_id_index` on `run` (`server_id`);');

        this.addSql('PRAGMA foreign_keys = OFF;');
        this.addSql('CREATE TABLE `_knex_temp_alter895` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `address_ip` text NOT NULL, `type` text check (`type` in (\'previous\', \'alternative\', \'recommended\', \'invalid\')) NOT NULL CHECK (`type` in(\'previous\' , \'alternative\' , \'recommended\')), `terminal_id` integer NOT NULL, `run_id` text NOT NULL, `status` text check (`status` in (\'actual\', \'potential\')) NOT NULL CHECK (`status` in(\'actual\' , \'potential\')) DEFAULT \'potential\', `hop` integer NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, CONSTRAINT `run_hop_address_ip_foreign` FOREIGN KEY (`address_ip`) REFERENCES `address` (`ip`) ON UPDATE CASCADE, CONSTRAINT `run_hop_terminal_id_foreign` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`) ON UPDATE CASCADE, CONSTRAINT `run_hop_run_id_foreign` FOREIGN KEY (`run_id`) REFERENCES `run` (`id`) ON UPDATE CASCADE);');
        this.addSql('INSERT INTO "_knex_temp_alter895" SELECT * FROM "run_hop";;');
        this.addSql('DROP TABLE "run_hop";');
        this.addSql('ALTER TABLE "_knex_temp_alter895" RENAME TO "run_hop";');
        this.addSql('CREATE INDEX `run_hop_run_id_index` on `run_hop` (`run_id`);');
        this.addSql('PRAGMA foreign_keys = ON;');
    }

}
