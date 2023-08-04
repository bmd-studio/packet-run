import 'reflect-metadata';
import { Collection, Entity, Enum, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';

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
    connectionsTo: Collection<Terminal> = new Collection<Terminal>(this);

    @ManyToMany(() => Terminal, 'connectionsTo')
    connectionsFrom = new Collection<Terminal>(this);

    @Property({ onUpdate: () => new Date() })
    lastSeenAt: Date = new Date();
}