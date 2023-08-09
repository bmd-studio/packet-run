import 'reflect-metadata';
import { Collection, Entity, EntityManager, Enum, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
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
    OFFLINE = 'offline',
}

@Entity()
export default class Terminal {
    @PrimaryKey()
    id!: number;

    @Enum(() => TerminalType)
    type!: TerminalType;

    @Enum(() => TerminalStatus)
    status: TerminalStatus = TerminalStatus.OFFLINE;

    @Property({ nullable: true })
    payload?: string;

    @ManyToMany(() => Terminal, null, { joinColumn: 'from_terminal_id', inverseJoinColumn: 'to_terminal_id' })
    connectionsTo = new Collection<Terminal>(this);

    @ManyToMany(() => Terminal, 'connectionsTo')
    connectionsFrom = new Collection<Terminal>(this);

    @OneToOne(() => Run, (run) => run.terminal)
    run: Rel<Run>;

    @OneToMany(() => Presence, (presence) => presence.terminal)
    presences = new Collection<Presence>(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

export async function fetchAllTerminals(em: EntityManager) {
    return em.find(Terminal, {}, { populate: ['connectionsFrom', 'connectionsTo', 'run', 'run.hops', 'run.route', 'presences']});
}