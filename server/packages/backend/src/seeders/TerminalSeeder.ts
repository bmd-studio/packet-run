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
        ]

        // em.create(Terminal, { id: 13, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 14, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 15, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 16, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 17, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 18, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 19, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 20, type: TerminalType.SPARE });

        await em.flush();

        const sender = terminals[1];
        const gateway = terminals[2];
        const server1 = terminals[5];
        const server2 = terminals[9];
        const receiver = terminals[12];

        // sender.connectionsTo.add([ gateway ]);
        // gateway.connectionsTo.add([ receiver, router3 ]);
        // router1.connectionsTo.add([  ]);
        // router2.connectionsTo.add([ server1 ]);
        // router3.connectionsTo.add([ gateway ]);
        // router4.connectionsTo.add([ router2, router5, router1 ]);
        // router5.connectionsTo.add([ router1, router2, router4 ]);
        // router6.connectionsTo.add([ router3, router2, server2 ]);
        // router7.connectionsTo.add([ router1, router4, router3 ]);
        // server1.connectionsTo.add([ router2, gateway ]);
        // server2.connectionsTo.add([ router6, gateway ]);

        sender.connectionsTo.add([ gateway ]);
        gateway.connectionsTo.add([ receiver, terminals[6] ]);
        server1.connectionsTo.add([ terminals[4], gateway ]);
        server2.connectionsTo.add([ terminals[10], gateway ]);

        terminals[3].connectionsTo.add([ terminals[6], terminals[8], terminals[11] ]);
        terminals[4].connectionsTo.add([ server1, terminals[7], terminals[11] ]);
        terminals[6].connectionsTo.add([ gateway, terminals[3], terminals[10] ]);
        terminals[7].connectionsTo.add([ terminals[4], terminals[10] ]);
        terminals[8].connectionsTo.add([ terminals[3], terminals[11] ]);
        terminals[10].connectionsTo.add([ server2, terminals[6], terminals[7] ]);
        terminals[11].connectionsTo.add([ terminals[3], terminals[4], terminals[8] ]);

        await em.flush();
    }
}
