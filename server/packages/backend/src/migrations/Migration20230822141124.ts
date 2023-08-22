import { Migration } from '@mikro-orm/migrations';

export class Migration20230822141124 extends Migration {

    async up(): Promise<void> {
        this.addSql('create table `address` (`ip` text not null, `info` text null, `created_at` datetime not null, `updated_at` datetime not null, primary key (`ip`));');

        this.addSql('create table `terminal` (`id` integer not null primary key autoincrement, `type` text check (`type` in (\'sender\', \'receiver\', \'server\', \'gateway\', \'router\')) not null, `status` text check (`status` in (\'idle\', \'scanning_nfc\', \'creating_packet\', \'created_packet\', \'offline\')) not null default \'offline\', `payload` text null, `created_at` datetime not null, `updated_at` datetime not null);');

        this.addSql('create table `run` (`id` text not null, `nfc_id` text not null, `url` text not null, `destination_ip` text null, `terminal_id` integer null, `current_hop_index` integer not null default 1, `created_at` datetime not null, `updated_at` datetime not null, `image_path` text null, constraint `run_destination_ip_foreign` foreign key(`destination_ip`) references `address`(`ip`) on delete set null on update cascade, constraint `run_terminal_id_foreign` foreign key(`terminal_id`) references `terminal`(`id`) on delete set null on update cascade, primary key (`id`));');
        this.addSql('create unique index `run_destination_ip_unique` on `run` (`destination_ip`);');
        this.addSql('create unique index `run_terminal_id_unique` on `run` (`terminal_id`);');

        this.addSql('create table `run_hop` (`id` integer not null primary key autoincrement, `address_ip` text not null, `type` text check (`type` in (\'previous\', \'alternative\', \'recommended\')) not null, `terminal_id` integer not null, `run_id` text not null, `status` text check (`status` in (\'actual\', \'potential\')) not null, `hop` integer not null, `created_at` datetime not null, `updated_at` datetime not null, constraint `run_hop_address_ip_foreign` foreign key(`address_ip`) references `address`(`ip`) on update cascade, constraint `run_hop_terminal_id_foreign` foreign key(`terminal_id`) references `terminal`(`id`) on update cascade, constraint `run_hop_run_id_foreign` foreign key(`run_id`) references `run`(`id`) on update cascade);');
        this.addSql('create index `run_hop_run_id_index` on `run_hop` (`run_id`);');

        this.addSql('create table `presence` (`id` integer not null primary key autoincrement, `terminal_id` integer not null, `ip` text not null, `websocket_id` text not null, `connected_at` datetime not null, `last_seen_at` datetime not null, constraint `presence_terminal_id_foreign` foreign key(`terminal_id`) references `terminal`(`id`) on update cascade);');
        this.addSql('create index `presence_terminal_id_index` on `presence` (`terminal_id`);');

        this.addSql('create table `terminal_connections_to` (`from_terminal_id` integer not null, `to_terminal_id` integer not null, constraint `terminal_connections_to_from_terminal_id_foreign` foreign key(`from_terminal_id`) references `terminal`(`id`) on delete cascade on update cascade, constraint `terminal_connections_to_to_terminal_id_foreign` foreign key(`to_terminal_id`) references `terminal`(`id`) on delete cascade on update cascade, primary key (`from_terminal_id`, `to_terminal_id`));');
        this.addSql('create index `terminal_connections_to_from_terminal_id_index` on `terminal_connections_to` (`from_terminal_id`);');
        this.addSql('create index `terminal_connections_to_to_terminal_id_index` on `terminal_connections_to` (`to_terminal_id`);');

        this.addSql('create table `traceroute_hop` (`id` integer not null primary key autoincrement, `address_ip` text not null, `run_id` text not null, `hop` integer not null, `created_at` datetime not null, `updated_at` datetime not null, constraint `traceroute_hop_address_ip_foreign` foreign key(`address_ip`) references `address`(`ip`) on update cascade, constraint `traceroute_hop_run_id_foreign` foreign key(`run_id`) references `run`(`id`) on update cascade);');
        this.addSql('create index `traceroute_hop_run_id_index` on `traceroute_hop` (`run_id`);');
    }

}
