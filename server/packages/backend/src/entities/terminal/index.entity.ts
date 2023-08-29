import 'reflect-metadata';
import { Collection, Entity, EntityManager, Enum, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import Run from '../run/index.entity';
import Presence from '../presence/index.entity';

export enum TerminalType {
    SENDER = 'sender',
    RECEIVER = 'receiver',
    SERVER = 'server',
    GATEWAY = 'gateway',
    ROUTER = 'router',
}

export enum TerminalStatus {
    IDLE = 'idle',
    SCANNING_NFC = 'scanning_nfc',
    CREATING_PACKET = 'creating_packet',
    CREATED_PACKET = 'created_packet',
}

@Entity()
export default class Terminal {
    @PrimaryKey()
    id!: number;

    @Enum(() => TerminalType)
    type!: TerminalType;

    @Enum(() => TerminalStatus)
    status: TerminalStatus = TerminalStatus.IDLE;

    @Property({ nullable: true })
    payload?: string;

    @OneToMany(() => TerminalConnection, (connection) => connection.from, { eager: true })
    connectionsTo = new Collection<TerminalConnection>(this);

    @OneToMany(() => TerminalConnection, (connection) => connection.to, { eager: true })
    connectionsFrom = new Collection<TerminalConnection>(this);

    @OneToOne(() => Run, { nullable: true, inversedBy: 'terminal'}, { eager: true })
    run?: Rel<Run>;

    @OneToMany(() => Presence, (presence) => presence.terminal)
    presences = new Collection<Presence>(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

@Entity()
export class TerminalConnection {
    @ManyToOne(() => Terminal, { primary: true, eager: true })
    from: Terminal;

    @ManyToOne(() => Terminal, { primary: true, eager: true })
    to: Terminal;

    @Property()
    slot: number;
}

export async function fetchAllTerminals(em: EntityManager) {
    return em.find(Terminal, {}, { 
        populate: [
            'connectionsFrom',
            'connectionsTo',
            'run',
            'run.tracerouteHops',
            'run.hops',
            'run.hops.address',
            'run.destination',
            'presences',
        ],
        cache: false,
    });
}