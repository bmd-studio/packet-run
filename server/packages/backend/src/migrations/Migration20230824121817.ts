import { Migration } from '@mikro-orm/migrations';

export class Migration20230824121817 extends Migration {

    async up(): Promise<void> {
        this.addSql('alter table `terminal` add column `run_id` text null constraint `terminal_run_id_foreign` references `run` (`id`) on update cascade on delete set null;');
        this.addSql('create unique index `terminal_run_id_unique` on `terminal` (`run_id`);');

        this.addSql('drop index `run_terminal_id_unique`;');
    }

}
