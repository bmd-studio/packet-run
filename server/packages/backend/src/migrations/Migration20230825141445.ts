import { Migration } from '@mikro-orm/migrations';

export class Migration20230825141445 extends Migration {

    async up(): Promise<void> {
        this.addSql('PRAGMA foreign_keys = OFF;');
        this.addSql('CREATE TABLE `_knex_temp_alter767` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `type` text NOT NULL CHECK (`type` in(\'sender\' , \'receiver\' , \'server\' , \'gateway\' , \'router\')), `status` text check (`status` in (\'idle\', \'scanning_nfc\', \'creating_packet\', \'created_packet\')) NOT NULL CHECK (`status` in(\'idle\' , \'scanning_nfc\' , \'creating_packet\' , \'created_packet\' , \'offline\')) DEFAULT \'idle\', `payload` text NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `run_id` text NULL CONSTRAINT `terminal_run_id_foreign` REFERENCES `run` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);');
        this.addSql('INSERT INTO "_knex_temp_alter767" SELECT * FROM "terminal";;');
        this.addSql('DROP TABLE "terminal";');
        this.addSql('ALTER TABLE "_knex_temp_alter767" RENAME TO "terminal";');
        this.addSql('CREATE UNIQUE INDEX `terminal_run_id_unique` on `terminal` (`run_id`);');
        this.addSql('PRAGMA foreign_keys = ON;');
    }

}
