import { Migration } from '@mikro-orm/migrations';

export class Migration20230823141017 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `run_hop` add column `may_perform_transformation` integer not null default false;');
    }

}
