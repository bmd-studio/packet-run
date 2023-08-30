import { Migration } from '@mikro-orm/migrations';

export class Migration20230824082656 extends Migration {

    async up(): Promise<void> {
        this.addSql('PRAGMA foreign_keys = OFF;');
        this.addSql('CREATE TABLE `_knex_temp_alter794` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `address_ip` text NULL, `type` text check (`type` in (\'previous\', \'alternative\', \'recommended\', \'invalid\', \'wormhole\')) NOT NULL, `terminal_id` integer NOT NULL, `run_id` text NOT NULL, `status` text NOT NULL CHECK (`status` in(\'actual\' , \'potential\')) DEFAULT \'potential\', `hop` integer NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `may_perform_transformation` integer NOT NULL DEFAULT false, CONSTRAINT `run_hop_address_ip_foreign` FOREIGN KEY (`address_ip`) REFERENCES `address` (`ip`) ON UPDATE CASCADE, CONSTRAINT `run_hop_terminal_id_foreign` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`) ON UPDATE CASCADE, CONSTRAINT `run_hop_run_id_foreign` FOREIGN KEY (`run_id`) REFERENCES `run` (`id`) ON UPDATE CASCADE);');
        this.addSql('INSERT INTO "_knex_temp_alter794" SELECT * FROM "run_hop";;');
        this.addSql('DROP TABLE "run_hop";');
        this.addSql('ALTER TABLE "_knex_temp_alter794" RENAME TO "run_hop";');
        this.addSql('CREATE INDEX `run_hop_run_id_index` on `run_hop` (`run_id`);');
        this.addSql('PRAGMA foreign_keys = ON;');
    }

}
