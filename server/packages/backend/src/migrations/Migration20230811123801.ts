import { Migration } from '@mikro-orm/migrations';

export class Migration20230811123801 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `address` rename column `operator` to `info`;');
    }

}
