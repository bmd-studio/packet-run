import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { customAlphabet } from 'nanoid';
import 'reflect-metadata';
import Address from '../address/index.entity';
import Terminal from '../terminal/index.entity';
import TracerouteHop from '../tracerouteHop/index.entity';
import RunHop from '../runHop/index.entity';

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

    @OneToOne(() => Address, { nullable: true })
    destination!: Rel<Address>;

    @OneToOne(() => Terminal, { nullable: true, inversedBy: 'run' })
    terminal?: Rel<Terminal>;

    @OneToMany(() => TracerouteHop, hop => hop.run)
    tracerouteHops = new Collection<Rel<TracerouteHop>>(this);

    @OneToMany(() => RunHop, hop => hop.run)
    hops = new Collection<Rel<RunHop>>(this);

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Property()
    currentHopIndex: number = 1;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Property({ nullable: true })
    imagePath?: string;
}