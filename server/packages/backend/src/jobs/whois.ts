import { IpregistryClient } from '@ipregistry/client';
import { MikroORM } from '@mikro-orm/core';
import Address from '../entities/address/index.entity';
import isInternalIP from '../lib/isInternalIP';

/**
 * This task takes a single IP address and attempts to fetch IP Info from an
 * external registry for that IP.
 */
export default async function whois(ip: string, orm: MikroORM, client: IpregistryClient) {
    // Retrieve the address
    const address = await orm.em.findOneOrFail(Address, { ip });

    // GUARD: Check if the ip is internal
    if (isInternalIP(ip)) {
        // If it is, flag it and handle it in the frontend
        address.isInternalIP = true;
    } else {
        // Add the info to the address and save
        address.info = (await client.lookup(ip)).data;
    }

    // Flush result to database
    await orm.em.flush();
}