import { Migration } from '@mikro-orm/migrations';

export class Migration20230825113009 extends Migration {

    async up(): Promise<void> {
        this.addSql('create table `terminal_connection` (`from_id` integer not null, `to_id` integer not null, `slot` integer not null, constraint `terminal_connection_from_id_foreign` foreign key(`from_id`) references `terminal`(`id`) on update cascade, constraint `terminal_connection_to_id_foreign` foreign key(`to_id`) references `terminal`(`id`) on update cascade, primary key (`from_id`, `to_id`));');
        this.addSql('create index `terminal_connection_from_id_index` on `terminal_connection` (`from_id`);');
        this.addSql('create index `terminal_connection_to_id_index` on `terminal_connection` (`to_id`);');
        this.addSql('create unique index `terminal_connection_slot_unique` on `terminal_connection` (`slot`);');

        this.addSql('drop table if exists `terminal_connections_to`;');
    }

}
 