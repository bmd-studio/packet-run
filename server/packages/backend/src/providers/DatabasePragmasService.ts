import { MikroORM } from '@mikro-orm/core';
import { MikroORM as MikroORMSQLite } from '@mikro-orm/better-sqlite';
import { Injectable, OnModuleInit } from '@nestjs/common';

/**
 * Will set the right pragmas when booting the application
 */
@Injectable()
export default class DatabasePragmasService implements OnModuleInit {
    constructor(private readonly orm: MikroORM) { }

    async onModuleInit() {
        await this.orm.connect();
        (this.orm as MikroORMSQLite).em.raw('PRAGMA journal_mode = wal;');
        (this.orm as MikroORMSQLite).em.raw('PRAGMA synchronous = normal;');
        (this.orm as MikroORMSQLite).em.raw('PRAGMA foreign_keys = on;');
        (this.orm as MikroORMSQLite).em.raw('PRAGMA temp_store = memory;');
        (this.orm as MikroORMSQLite).em.raw('PRAGMA cache_size = -512000;');
        (this.orm as MikroORMSQLite).em.raw('PRAGMA mmap_size = 30000000000;');
    }
}