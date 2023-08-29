/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Collection, Entity, Enum, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { customAlphabet } from 'nanoid';
import 'reflect-metadata';
import Address from '../address/index.entity';
import Terminal from '../terminal/index.entity';
import TracerouteHop from '../tracerouteHop/index.entity';
import RunHop from '../runHop/index.entity';

export enum RunPacketType {
    REQUEST = 'request',
    RESPONSE = 'response',
}

const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    12
);

@Entity()
export default class Run {
    @PrimaryKey()
    id: string = nanoid();

    @Property()
    nfcId?: string;

    @Property()
    url!: string;

    @ManyToOne(() => Address, { nullable: true, unique: false })
    destination!: Rel<Address>;

    @OneToOne(() => Terminal, (terminal) => terminal.run)
    terminal?: Rel<Terminal>;

    @ManyToOne(() => Terminal)
    server: Rel<Terminal>;

    @Property()
    isTracerouteFinished: boolean = false;

    @OneToMany(() => TracerouteHop, hop => hop.run)
    tracerouteHops = new Collection<Rel<TracerouteHop>>(this);

    @OneToMany(() => RunHop, hop => hop.run)
    hops = new Collection<Rel<RunHop>>(this);

    @Enum(() => RunPacketType)
    packetType: RunPacketType = RunPacketType.REQUEST;

    @Property()
    currentHopIndex: number = 1;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Property({ nullable: true })
    imagePath?: string;
}