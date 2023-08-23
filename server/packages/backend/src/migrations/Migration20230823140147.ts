import { Migration } from '@mikro-orm/migrations';

export class Migration20230823140147 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `run` add column `is_traceroute_finished` integer not null default false;');
        this.addSql('alter table `run` add column `packet_type` text check (`packet_type` in (\'request\', \'response\')) not null default \'request\';');
    }

}
