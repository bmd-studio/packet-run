import { IpInfo, IpregistryClient } from '@ipregistry/client';
import { MikroORM } from '@mikro-orm/core';
import Address from '../entities/address/index.entity';
import isInternalIP from '../lib/isInternalIP';
import { Location } from '../entities/address/ipinfo.model';

/**
 * This task takes a single IP address and attempts to fetch IP Info from an
 * external registry for that IP.
 */
export default async function whois(
    ip: string,
    orm: MikroORM,
    client: IpregistryClient,
    defaultLocation: Location,
    defaultCompany: string,
) {
    // Retrieve the address
    const address = await orm.em.findOneOrFail(Address, { ip });

    // GUARD: Check if the ip is internal
    if (isInternalIP(ip)) {
        // If it is, flag it and handle it in the frontend
        address.isInternalIP = true;
        // Add the default location
        address.info = {
            ip,
            location: defaultLocation as IpInfo['location'],
            type: 'IPv4',
            hostname: null,
            carrier: null,
            company: {
                name: defaultCompany,
                type: 'business',
                domain: null,
            },
            connection: null,
            currency: null,
            security: null,
            time_zone: null,
        }
    } else {
        // GUARD: Only load data for non-alt addresses
        if (!address.isInAltNetwork) {
            // Add the info to the address and save
            address.info = (await client.lookupIp(ip)).data;
        }
    }

    // Flush result to database
    await orm.em.flush();
}