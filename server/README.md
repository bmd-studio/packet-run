# Packet Run — Server
This directory contains all software that is to be run on the server. This
repository is setup as a monorepo using NPM workspaces. Using yarn is strongly
discouraged. 

In order to set up the monorepo, run:

```
npm install
```

The monorepo contains two distinct codebases (found in `./packages`). One for
the front-end (built using NextJS) and one for the back-end (built using NestJS).

## Requirements
Note that a redis server should be running before starting the server.

A redis server can be started by running the following command:
``
redis-server
``

## Other commands
Build all code for production and run the resulting scripts in parallel:
```
npm start
```

Start all packages in dev-mode, watching for changes and re-starting the scripts
when they have been changed:
```
npm run dev
```

Build all code for production:
```
npm run build
```

Check if all code adheres to coding standards:
```
npm run lint
```
