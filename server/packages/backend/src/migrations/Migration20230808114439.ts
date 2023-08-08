import { Migration } from '@mikro-orm/migrations';

export class Migration20230808114439 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `address` add column `created_at` datetime not null;');

        this.addSql('alter table `terminal` add column `created_at` datetime not null;');
        this.addSql('alter table `terminal` add column `updated_at` datetime not null;');

        this.addSql('alter table `run` add column `created_at` datetime not null;');
        this.addSql('alter table `run` add column `updated_at` datetime not null;');

        this.addSql('alter table `hop` add column `created_at` datetime not null;');
        this.addSql('alter table `hop` add column `updated_at` datetime not null;');
    }

}
