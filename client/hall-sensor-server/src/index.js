const { Gpio } = require('onoff');
const http = require('http');

/** Define the port on which the webserver should listen */
const PORT = 8000;

async function main() {
    // Create a new Gpio input that listens to the state of hall sensor 
    const sensor = new Gpio(514, 'in', 'both', { debounceTimeout: 50 });
    
    // Keep the state in a variable as a boolean
    let state = false;

    // Watch the gpio pin for changes
    sensor.watch((err, value) => {
        // If the pin changes, push it to the state
        console.log('Received new hall sensor value: ', !value);
        state = !value;
    });

    // Create a webserver
    const server = http.createServer((req, res) => {
        // Return the state
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200);
        res.end(state.toString());
    });

    // Start the server
    server.listen(PORT, '127.0.0.1');
    console.log(`Hall-sensor server is running on http://127.0.0.1:${PORT}`);
}

main();