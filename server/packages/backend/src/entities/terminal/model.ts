import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TerminalStatus, TerminalType } from './index.entity';
import Run from '../run/model';
import { Rel } from '@mikro-orm/core';
import Presence from '../presence/model';

registerEnumType(TerminalType, { name: 'TerminalType', valuesMap: {
    SENDER: { description: 'Creates a request and dispatches it to an `gateway`' },
    RECEIVER: { description: 'Receives a response and displays it on a connected screen' },
    SERVER: { description: 'Receives a request, transforms it into a response' },
    ROUTER: { description: 'A distributor of packets across the internet' },
    GATEWAY: { description: 'A special type of router that bridges a `sender` and an internet of `router`s' },
} });
registerEnumType(TerminalStatus, { name: 'TerminalStatus', valuesMap: {
    IDLE: { description: 'The terminal is active and operational, but not currently in use by a user' },
    SCANNING_NFC: { description: 'A packet is currently being scanned using the NFC reader' },
    CREATING_PACKET: { description: 'A packet is actively being created or transformed on the terminal' },
    CREATED_PACKET: { description: 'A packet has been transformed, but is still actively being scanned' },
    OFFLINE: { description: 'The terminal has failed its heartbeats and is considered offline' },
} });

@ObjectType()
export default class Terminal {
    @Field()
    id: number;

    @Field()
    type: TerminalType;

    @Field()
    status: TerminalStatus;

    @Field({ nullable: true })
    payload?: string;

    @Field(() => [TerminalConnection])
    connectionsTo: TerminalConnection[];

    @Field(() => [TerminalConnection])
    connectionsFrom: TerminalConnection[];

    @Field(() => Run, { nullable: true })
    run?: Rel<Run>;

    @Field(() => [Presence])
    presences: Rel<Presence[]>;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@ObjectType()
export class TerminalConnection {
    @Field()
    from: Terminal;

    @Field()
    to: Terminal;

    @Field()
    slot: number;
}