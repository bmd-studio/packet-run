import { MikroORM } from '@mikro-orm/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Terminal, { TerminalStatus } from '../entities/terminal/index.entity';

/**
 * Will reset all terminals when the applicationn boots.
 */
@Injectable()
export default class InitTerminalProvider implements OnModuleInit {
    private readonly logger = new Logger(InitTerminalProvider.name);

    constructor(private readonly orm: MikroORM) { }

    async onModuleInit() {
        const terminals = await this.orm.em.find(Terminal, {});
        terminals.forEach((terminal) => {
            terminal.status = TerminalStatus.IDLE;
            terminal.run = null;    
        });
        await this.orm.em.flush();
        this.logger.log('Successfully reset all terminals.');
    }
}
