import { Migration } from '@mikro-orm/migrations';

export class Migration20230801141014 extends Migration {

    async up(): Promise<void> {
        this.addSql('create table `terminal_connections_to` (`from_terminal_id` integer not null, `to_terminal_id` integer not null, constraint `terminal_connections_to_from_terminal_id_foreign` foreign key(`from_terminal_id`) references `terminal`(`id`) on delete cascade on update cascade, constraint `terminal_connections_to_to_terminal_id_foreign` foreign key(`to_terminal_id`) references `terminal`(`id`) on delete cascade on update cascade, primary key (`from_terminal_id`, `to_terminal_id`));');
        this.addSql('create index `terminal_connections_to_from_terminal_id_index` on `terminal_connections_to` (`from_terminal_id`);');
        this.addSql('create index `terminal_connections_to_to_terminal_id_index` on `terminal_connections_to` (`to_terminal_id`);');

        this.addSql('drop table if exists `terminal_connections`;');

        this.addSql('alter table `hop` add column `hop` integer not null;');
    }

}
