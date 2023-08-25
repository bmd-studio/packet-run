import { IpregistryClient } from '@ipregistry/client';
import { MikroORM } from '@mikro-orm/core';
import Address from '../entities/address/index.entity';
import { BlockList } from 'net';

const blocklist = new BlockList();

// Private network ranges as per: https://en.wikipedia.org/wiki/Private_network
blocklist.addRange('10.0.0.0', '10.255.255.255');
blocklist.addRange('172.16.0.0', '172.31.255.255');
blocklist.addRange('192.168.0.0', '192.168.255.255');

// Link-local addresses
blocklist.addRange('169.254.0.0', '169.254.255.255');

// Loopback addresses
blocklist.addRange('127.0.0.0', '127.255.255.255');

/**
 * This task takes a single IP address and attempts to fetch IP Info from an
 * external registry for that IP.
 */
export default async function whois(ip: string, orm: MikroORM, client: IpregistryClient) {
    if (blocklist.check(ip)) {
        return;
    }

    // Retrieve the WHOIS data
    const result = await client.lookup(ip);

    // Retrieve the address
    const address = await orm.em.findOneOrFail(Address, { ip });

    // Add the info to the address and save
    address.info = result.data;
    await orm.em.flush();
}