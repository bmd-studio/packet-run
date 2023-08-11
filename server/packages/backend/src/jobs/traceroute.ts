import Traceroute from 'nodejs-traceroute';
import Run from '../entities/run/index.entity';
import Address from '../entities/address/index.entity';
import Hop from '../entities/hop/index.entity';
import { MikroORM } from '@mikro-orm/core';

/**
 * A convenience function that either finds an address by its IP, or
 * alternatively creates it and inserts it into the database.
 */
async function findOrCreateAddress(ip: string, orm: MikroORM) {
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
    orm.em.flush();

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
    return new Promise<void>((resolve, reject) => {
        // Instantiate traceroute
        const tracer = new Traceroute();
        
        // Whenever a destination is received, add it as the destination address
        tracer.on('destination', async (destination) => {
            const address = await findOrCreateAddress(destination, orm);
            run.destination = address;
            await orm.em.flush();
        });

        // Whenever a new hop is received, wrap it in an address and add it as a hop
        tracer.on('hop', async ({ ip, hop: hopNumber }) => {
            const address = await findOrCreateAddress(ip, orm);
            orm.em.create(Hop, { address, run, hop: hopNumber });
            await orm.em.flush();
        });

        // Wait for the traceroute command to finish
        tracer.on('close', (code) => {
            // GUARD: Check that the command was executed successfully
            if (code === 0){
                resolve();
            } else {
                reject(code);
            }
        });

        tracer.trace(host);
    });
}
