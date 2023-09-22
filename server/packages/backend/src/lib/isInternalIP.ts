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
 * Check whether an IP is in an internal range
 */
export default function isInternalIP(ip: string) {
    return blocklist.check(ip);
}