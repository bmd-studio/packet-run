import { Migration } from '@mikro-orm/migrations';

export class Migration20230825113914 extends Migration {

    async up(): Promise<void> {
        this.addSql('drop index `terminal_connection_slot_unique`;');
    }

}
