/** @type {import('@mikro-orm/core').Options} Options */
const config = {
    type: 'better-sqlite',
    dbName: './data/packet-run.db',
    entities: ['./dist/entities/**/index.entity.js'],
    entitiesTs: ['./src/entities/**/index.entity.ts'],
};

module.exports = config;