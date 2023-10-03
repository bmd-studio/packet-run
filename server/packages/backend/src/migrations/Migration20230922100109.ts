import { Migration } from '@mikro-orm/migrations';

export class Migration20230922100109 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `address` add column `is_internal_ip` integer not null default false;');
    }

}
