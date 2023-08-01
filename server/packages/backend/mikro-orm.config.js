/** @type {import('@mikro-orm/core').Options} Options */
const config = {
    type: 'better-sqlite',
    dbName: './database/packet-run.db',
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
};

module.exports = config;