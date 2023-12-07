# Packet Run — Back-end
This package contains the back-end code for Packet Run. It's a NestJS-based Node
back-end that is almost exclusively accessed through its GraphQL-based API,
powered by Apollo Server. It features a Worker Queue powered by BullMQ.

## Requirements
This package requires a relatively recent version of NodeJS (v20+
recommended). You will also need redis (v7+ recommended) for the event queue.

## Usage
1. In order to start the front-end, first install all NPM packages:
```
npm install
```

2. Then, create a `.env` file from the default example:
```
cp .env.example .env
```

3. (OPTIONAL) Set your [IPRegistry API
   Token](https://dashboard.ipregistry.co/keys) in the the `.env` file. If you
   don't set it, no IP metadata will be displayed.

4. Run all migrations
```
npm run initialize
```

5. Start the development server
```
npm run dev
```

The back-end is served by default on port `8080`. You may interact with it
through GraphQL (available on `http://localhost:8080/graphql`).

## Architecture
This codebase is split out into a number of modules, services and providers that
together create the full back-end service. You can find an overview of all
modules that are loaded in this application at `./src/app.module.ts`.

### Databasae
The back-end is powered by an SQLite database that is stored locally. By running
`npm run initialize`, this database is initialised, migrated and seeded. The
database is located in the `./data/packet-run.db` file.

The database is accessed through the MikroORM ORM layer. This layer features a
number of `entities` (or "models") that are stored in
`./src/entities/**/index.entity.ts`. Each files corresponds with a table in the
database, and the files contain the properties that should be available in the
database, along with their types.

The database is automagically migrated through the [MikroORM migration
manager](https://mikro-orm.io/docs/migrations). Whenever entity files are
changed, it's recommended to generate a new migration.

MikroORM also features subscribers, which allow create/update hooks for all
models. These are co-located with the entitities in `./src/entities/**/subscriber.ts`.

### GraphQL
The data is made available through an GraphQL API. In order to specify data
access for these, you can find resolvers (in `./src/entities/**/resolver.ts`)
that specify which models are available in the API and how they should exactly
be resolved. The output types for the GraphQL API are defined as GraphQL
"models" in `./src/entities/**/model.ts`.

These resolvers also specify which mutations should be made available to
clients, and how they should be handled. 

In order for the application to respond as quickly as possible to user inputs,
the back-end makes most of it data available across WebSockets, actively pushing
data to clients whenever models are updated. There is some glue code that hooks
into the MikroORM subscribers that automatically triggers GraphQL updates
whenever entities are changed.

### Jobs
We use traceroute to gather the route to a particular website. As traceroute is
asynchronous, we need to perform some tasks asychronously, as new addressed come
in. In order to facilitate this, we use a BullMQ queue, with jobs that are
defined in `./src/jobs`.

These jobs include traceroute itself, retrieving IP metadata from IPRegistry, as
well as retrieving the website and exporting it as an image so we display it
later. The latter task is accomplished in a headless Chrome instance powered by
Puppeteer.

As the BullMQ queue is powered by redis, you will need to have redis installed
locally. Note that the current back-end implementation assumes your redis client
is unauthenticated.
