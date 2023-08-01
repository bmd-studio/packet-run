import { Migration } from '@mikro-orm/migrations';

export class Migration20230801154902 extends Migration {
    async up(): Promise<void> {
        this.execute('PRAGMA journal_mode = wal;');
        this.execute('PRAGMA synchronous = normal;');
        this.execute('PRAGMA foreign_keys = on;');
        this.execute('PRAGMA temp_store = memory;');
        this.execute('PRAGMA cache_size = -512000;');
        this.execute('PRAGMA mmap_size = 30000000000;');
    }
}
