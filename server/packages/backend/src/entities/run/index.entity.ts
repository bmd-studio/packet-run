import { Collection, Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { customAlphabet } from 'nanoid';
import 'reflect-metadata';
import Address from '../address/index.entity';
import Terminal from '../terminal/index.entity';
import Hop from '../hop/index.entity';

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

    @ManyToMany(() => Address)
    hops: Collection<Rel<Address>> = new Collection<Rel<Address>>(this);

    @OneToOne(() => Terminal, { nullable: true, inversedBy: 'run' })
    terminal?: Rel<Terminal>;

    @OneToMany(() => Hop, hop => hop.run)
    route = new Collection<Rel<Hop>>(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Property({ nullable: true })
    imagePath?: string;
}