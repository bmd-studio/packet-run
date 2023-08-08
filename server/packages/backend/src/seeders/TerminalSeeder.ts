import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Terminal, { TerminalType } from '../entities/terminal/index.entity';

export class TerminalSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        const sender = em.create(Terminal, { id: 1, type: TerminalType.SENDER });
        const gateway = em.create(Terminal, { id: 2, type: TerminalType.GATEWAY });
        const router1 = em.create(Terminal, { id: 3, type: TerminalType.ROUTER });
        const router2 = em.create(Terminal, { id: 4, type: TerminalType.ROUTER });
        const server1 = em.create(Terminal, { id: 5, type: TerminalType.SERVER });
        const router3 = em.create(Terminal, { id: 6, type: TerminalType.ROUTER });
        const router4 = em.create(Terminal, { id: 7, type: TerminalType.ROUTER });
        const router5 = em.create(Terminal, { id: 8, type: TerminalType.ROUTER });
        const server2 = em.create(Terminal, { id: 9, type: TerminalType.SERVER });
        const router6 = em.create(Terminal, { id: 10, type: TerminalType.ROUTER });
        const router7 = em.create(Terminal, { id: 11, type: TerminalType.ROUTER });
        const receiver = em.create(Terminal, { id: 12, type: TerminalType.RECEIVER });
        // em.create(Terminal, { id: 13, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 14, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 15, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 16, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 17, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 18, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 19, type: TerminalType.SPARE });
        // em.create(Terminal, { id: 20, type: TerminalType.SPARE });

        await em.flush();

        sender.connectionsTo.add([ gateway ]);
        gateway.connectionsTo.add([ receiver, router3 ]);
        router1.connectionsTo.add([ router3, router5, router6, router7 ]);
        router2.connectionsTo.add([ server1, router4, router6, router6 ]);
        router3.connectionsTo.add([ gateway, router1, router6, router6 ]);
        router4.connectionsTo.add([ router2, router7, router5, router1 ]);
        router5.connectionsTo.add([ router1, router2, router4, router7 ]);
        router6.connectionsTo.add([ router1, router2, router3, server2 ]);
        router7.connectionsTo.add([ router1, router4, router3, router5 ]);
        server1.connectionsTo.add([ router2, gateway ]);
        server2.connectionsTo.add([ router6, gateway ]);

        await em.flush();
    }
}
