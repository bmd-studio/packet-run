import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Terminal, { TerminalConnection, TerminalType } from '../entities/terminal/index.entity';

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

        em.create(TerminalConnection, { from: sender, to: gateway, slot: 1 });
        
        em.create(TerminalConnection, { from: gateway, to: receiver, slot: 1 });
        em.create(TerminalConnection, { from: gateway, to: terminals[6], slot: 2 });
        
        em.create(TerminalConnection, { from: server1, to: gateway, slot: 1 });
        em.create(TerminalConnection, { from: server1, to: terminals[4], slot: 2 });

        em.create(TerminalConnection, { from: server2, to: gateway, slot: 1 });
        em.create(TerminalConnection, { from: server2, to: terminals[10], slot: 2 });

        em.create(TerminalConnection, { from: terminals[3], to: terminals[11], slot: 1 });
        em.create(TerminalConnection, { from: terminals[3], to: terminals[8], slot: 2 });
        em.create(TerminalConnection, { from: terminals[3], to: terminals[6], slot: 3 });

        em.create(TerminalConnection, { from: terminals[4], to: terminals[11], slot: 1 });
        em.create(TerminalConnection, { from: terminals[4], to: terminals[7], slot: 2 });
        em.create(TerminalConnection, { from: terminals[4], to: server1, slot: 3 });

        em.create(TerminalConnection, { from: terminals[6], to: terminals[3], slot: 1 });
        em.create(TerminalConnection, { from: terminals[6], to: gateway, slot: 2 });
        em.create(TerminalConnection, { from: terminals[6], to: terminals[10], slot: 3 });

        em.create(TerminalConnection, { from: terminals[7], to: terminals[4], slot: 1 });
        em.create(TerminalConnection, { from: terminals[7], to: terminals[10], slot: 2 });

        em.create(TerminalConnection, { from: terminals[8], to: terminals[3], slot: 1 });
        em.create(TerminalConnection, { from: terminals[8], to: terminals[11], slot: 2 });

        em.create(TerminalConnection, { from: terminals[10], to: server2, slot: 1 });
        em.create(TerminalConnection, { from: terminals[10], to: terminals[7], slot: 2 });
        em.create(TerminalConnection, { from: terminals[10], to: terminals[6], slot: 3 });

        em.create(TerminalConnection, { from: terminals[11], to: terminals[8], slot: 1 });
        em.create(TerminalConnection, { from: terminals[11], to: terminals[4], slot: 2 });
        em.create(TerminalConnection, { from: terminals[11], to: terminals[3], slot: 3 });

        await em.flush();
    }
}
