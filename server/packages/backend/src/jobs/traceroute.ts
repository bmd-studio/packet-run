import Traceroute from 'nodejs-traceroute';
import Run from '../entities/run/index.entity';
import Address from '../entities/address/index.entity';
import TracerouteHop from '../entities/tracerouteHop/index.entity';
import { MikroORM } from '@mikro-orm/core';
import { networkInterfaces } from 'os';
import RunHop, { RunHopStatus, RunHopType } from '../entities/runHop/index.entity';
import Terminal, { TerminalType } from '../entities/terminal/index.entity';

/**
 * A convenience function that either finds an address by its IP, or
 * alternatively creates it and inserts it into the database.
 */
async function findOrCreateAddress(ip: string, orm: MikroORM): Promise<Address | null> {
    // GUARD: We cannot save '*' IPs, as they indicate unresponsive routers
    if (ip === '*') {
        return null;
    }

    // Check if the address exists
    const exists = (await orm.em.count(Address, { ip })) >= 1;

    // Based on this, either create or retrieve it
    const address = exists
        ? await orm.em.findOneOrFail(Address, { ip })
        : orm.em.create(Address, { ip });

    // Make sure we change the updatedAt column so we trigger the events
    address.updatedAt = new Date();
    await orm.em.flush();

    return address;
}

/**
 * This job takes a base runId, and retrieves the destination IP and all
 * underlying hops.
 */
export default async function (runId: string, orm: MikroORM) {
    // Retrieve the run
    const run = await orm.em.findOneOrFail(Run, runId, { populate: ['id', 'url']});

    // GUARD: Check that the run exists
    if (!run) {
        throw new Error('RunNotFound');
    }

    // Retrieve the host from the URL
    const { host } = new URL(run.url);

    // Wrap traceroute in a promise
    return new Promise<void>(async (resolve, reject) => {
        // Instantiate traceroute
        const tracer = new Traceroute();
        
        // Whenever a destination is received, add it as the destination address
        tracer.on('destination', async (destination) => {
            // Insert the address
            const address = await findOrCreateAddress(destination, orm);

            // Assign it as a destination and save to database
            run.destination = address;
            await orm.em.flush();
        });

        // Whenever a new hop is received, wrap it in an address and add it as a hop
        tracer.on('hop', async ({ ip, hop: hopNumber }) => {
            // Create the to address
            const address = await findOrCreateAddress(ip, orm);

            // Insert the hop
            const hop = orm.em.create(TracerouteHop, { address, hop: hopNumber + 1 });
            run.tracerouteHops.add(hop);

            // GUARD: Wait for the first hop to come in 
            if (hopNumber === 1) {
                const gateway = await orm.em.findOneOrFail(Terminal, { type: TerminalType.GATEWAY });

                // Then create the first RunHop
                orm.em.create(RunHop, {
                    run,
                    terminal: gateway,
                    type: RunHopType.RECOMMENDED,
                    address,
                    hop: 2,
                });
            }

            // Save to database
            await orm.em.flush();
        });

        // Wait for the traceroute command to finish
        tracer.on('close', async (code) => {
            // GUARD: Check that the command was executed successfully
            if (code === 0){
                // Mark traceroute as finished
                run.isTracerouteFinished = true;
                await orm.em.flush();

                // Mark the job as complete
                resolve();
            } else {
                reject(code);
            }
        });

        // Start the tracer
        tracer.trace(host);

        // Also retrieve the origin
        const interfaces = networkInterfaces();
        const info = Object.keys(interfaces)
            .flatMap((key) => interfaces[key])
            .find((info) => info.family === 'IPv4' && info.internal === false);

        // GUARD: Check if we successfully managed to retrieve an address
        if (info) {
            // Create a first hop for the origin 
            const address = await findOrCreateAddress(info.address, orm);
            const hop = orm.em.create(TracerouteHop, { address, hop: 1 });
            run.tracerouteHops.add(hop);

            // Retrieve the sender
            const sender = await orm.em.findOneOrFail(Terminal, { type: TerminalType.SENDER });

            // Also create the first RunHop
            orm.em.create(RunHop, {
                run,
                terminal: sender,
                type: RunHopType.RECOMMENDED,
                status: RunHopStatus.ACTUAL,
                address,
                hop: 1,
            });

            // Since we've marked this hop as actual, we need to increase the
            // hop index
            run.currentHopIndex += 1;

            // Save to database
            await orm.em.flush();
        }
    });
}
