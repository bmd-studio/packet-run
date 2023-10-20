import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import path from 'path';

/**
 * Will load a blocklist from a text file and make it available for checking.
 */
@Injectable()
export default class UrlFiliterProvider implements OnModuleInit {
    private readonly logger = new Logger(UrlFiliterProvider.name);
    private blockList = new Set<string>();

    async onModuleInit() {
        // Read blocklist
        const data = await readFile(
            path.join(__dirname, '..', '..', 'data', 'blocklist', 'block.txt'),
            { encoding: 'utf-8'}
        );

        // Split into lines
        const domains = data.split(/\r\n|\r|\n/);

        // Add all domains to the blocklist
        domains.forEach((domain) => this.blockList.add(domain));

        this.logger.log(`Loaded ${domains.length} blocked domains.`);
    }

    isUrlBlocked(url: string): boolean {
        if (url.startsWith('www.')) {
            return this.blockList.has(url.split('www.')[1]);
        }

        return this.blockList.has(url);
    }
}
