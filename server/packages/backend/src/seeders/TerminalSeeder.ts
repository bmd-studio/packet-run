import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Terminal, { TerminalType } from '../entities/terminal/index.entity';

export class TerminalSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        const terminals: Terminal[] = [
            {} as Terminal,
            em.create(Terminal, { id: 1, type: TerminalType.SENDER }),
            em.create(Terminal, { id: 2, type: TerminalType.GATEWAY }),
            em.create(Terminal, { id: 3, type: TerminalType.ROUTER }),
            em.create(Terminal, { id: 4, type: TerminalType.ROUTER }),
            em.create(Terminal, { id: 5, type: TerminalType.SERVER }),
            em.create(Terminal, { id: 6, type: TerminalType.ROUTER }),
            em.create(Terminal, { id: 7, type: TerminalType.ROUTER }),
            em.create(Terminal, { id: 8, type: TerminalType.ROUTER }),
            em.create(Terminal, { id: 9, type: TerminalType.SERVER }),
            em.create(Terminal, { id: 10, type: TerminalType.ROUTER }),
            em.create(Terminal, { id: 11, type: TerminalType.ROUTER }),
            em.create(Terminal, { id: 12, type: TerminalType.RECEIVER }),
        ];

        await em.flush();

        const sender = terminals[1];
        const gateway = terminals[2];
        const server1 = terminals[5];
        const server2 = terminals[9];
        const receiver = terminals[12];

        sender.connectionsTo.add([ gateway ]);
        gateway.connectionsTo.add([ receiver, terminals[6] ]);
        server1.connectionsTo.add([ gateway, terminals[4] ]);
        server2.connectionsTo.add([ terminals[10], gateway ]);

        terminals[3].connectionsTo.add([ terminals[6], terminals[8], terminals[11] ]);
        terminals[4].connectionsTo.add([ server1, terminals[7], terminals[11] ]);
        terminals[6].connectionsTo.add([ terminals[10], gateway, terminals[3] ]);
        terminals[7].connectionsTo.add([ terminals[10], terminals[4] ]);
        terminals[8].connectionsTo.add([ terminals[11], terminals[3] ]);
        terminals[10].connectionsTo.add([ terminals[6], terminals[7], server2 ]);
        terminals[11].connectionsTo.add([ terminals[3], terminals[4], terminals[8] ]);

        await em.flush();
    }
}
