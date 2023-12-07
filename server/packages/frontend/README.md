# Packet Run — Front-end
This package contains the front-end for Packet Run. It's a React-based frontend
powered by [NextJS](https://nextjs.org). It features Apollo for data fetching,
Styled Components for styling and mapbox-gl for map rendering.

## Requirements
This package requires a relatively recent version of NodeJS (v20+
recommended). 

## Usage
1. In order to start the front-end, first install all NPM packages:
```
npm install
```

2. Then, create a `.env` file from the default example:
```
cp .env.example .env
```

3. (OPTIONAL) Set your [Mapbox API
   Token](https://account.mapbox.com/access-tokens/) in the `.env` file. If you
   don't maps will not work

4. Start the development server
```
npm run dev
```

Follow the link provided in your CLI and the application should be work. This
codebase assumes the back-end will be running on the same host on port `8080`.
Please refer to the [back-end documentation](../backend/) for information on
setting up the back-end.

A dashboard is available on the root route (http://localhost:3000/) that
displays the back-end status for the full system.

## Architecture
This codebase is structured so that the Raspberry Pi clients connect to the
back-end through a URL that is formatted according to their id (e.g.
`http://localhost:3000/terminal/8`). Depending on the terminal type, they are redirected
to their respective pages (e.g. `http://localhost:3000/router/8`). These various
pages handle functionalities specific to their terminal type. 

In these pages, the front-end will make a connection to the back-end over
Websockets. Any time an update is issued, all data is updated and the page
re-renders. The philosophy for this codebase is that any and all changes are
send to the back-end, after which the back-end updates its data, updates are
sent over websocket the front-end and the front-end re-renders. As little data
is stored on-client as possible to mitigate risks of crashes.

The front-end attempts to connect to required peripherals, such as NFC readers
(connected via WebSerial) or Hall Sensors (connected over the [HTTP API hosted
by the client](../../../client/hall-sensor-server/)). The logic for these
connections is abstracted using the hooks in the `./src/lib` directory.