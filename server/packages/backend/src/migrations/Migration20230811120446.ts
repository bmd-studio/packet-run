import { Migration } from '@mikro-orm/migrations';

export class Migration20230811120446 extends Migration {

    async up(): Promise<void> {
        this.addSql('drop index `hop_address_ip_unique`;');
    }

}
