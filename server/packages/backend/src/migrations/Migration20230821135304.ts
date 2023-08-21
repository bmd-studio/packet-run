import { Migration } from '@mikro-orm/migrations';

export class Migration20230821135304 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `run` add column `image_path` text null;');
  }

}
