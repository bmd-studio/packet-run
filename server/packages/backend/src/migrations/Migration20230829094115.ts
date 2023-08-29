import { Migration } from '@mikro-orm/migrations';

export class Migration20230829094115 extends Migration {

    async up(): Promise<void> {
        this.addSql('drop index `run_destination_ip_unique`;');
        this.addSql('create index `run_destination_ip_index` on `run` (`destination_ip`);');
    }

}
