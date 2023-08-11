import { IpregistryClient } from '@ipregistry/client';
import { MikroORM } from '@mikro-orm/core';
import Address from '../entities/address/index.entity';

/**
 * This task takes a single IP address and attempts to fetch IP Info from an
 * external registry for that IP.
 */
export default async function whois(ip: string, orm: MikroORM, client: IpregistryClient) {
    // Retrieve the WHOIS data
    const result = await client.lookup(ip);

    // Retrieve the address
    const address = await orm.em.findOneOrFail(Address, { ip });

    // Add the info to the address and save
    address.info = result.data;
    await orm.em.flush();
}