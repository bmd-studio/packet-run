import { Migration } from '@mikro-orm/migrations';

export class Migration20230824083637 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `address` add column `is_in_alt_network` integer not null default false;');
    }

}
