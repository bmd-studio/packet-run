/** @type {import('@mikro-orm/core').Options} Options */


import { defineConfig } from '@mikro-orm/better-sqlite';

export default defineConfig({
    dbName: './data/packet-run.db',
    entities: ['./dist/entities/**/index.entity.js'],
    entitiesTs: ['./src/entities/**/index.entity.ts'],
});
