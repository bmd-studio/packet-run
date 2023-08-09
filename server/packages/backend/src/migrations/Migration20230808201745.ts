import { Migration } from '@mikro-orm/migrations';

export class Migration20230808201745 extends Migration {

    async up(): Promise<void> {
        this.addSql('create table `presence` (`id` integer not null primary key autoincrement, `terminal_id` integer not null, `ip` text not null, `websocket_id` text not null, `connected_at` datetime not null, `last_seen_at` datetime not null, constraint `presence_terminal_id_foreign` foreign key(`terminal_id`) references `terminal`(`id`) on update cascade);');
        this.addSql('create index `presence_terminal_id_index` on `presence` (`terminal_id`);');
    }

}
