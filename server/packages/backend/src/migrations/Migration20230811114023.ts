import { Migration } from '@mikro-orm/migrations';

export class Migration20230811114023 extends Migration {

    async up(): Promise<void> {
        this.addSql('drop index `hop_terminal_id_unique`;');
    }

}
