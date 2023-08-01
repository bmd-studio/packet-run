import { Collection, Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { customAlphabet } from 'nanoid';
import 'reflect-metadata';
import Address from './Address';
import Terminal from './Terminal';
import Hop from './Hop';

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

    @OneToOne()
    destination!: Address;

    @ManyToMany(() => Address)
    hops: Collection<Address> = new Collection<Address>(this);

    @OneToOne({ nullable: true })
    terminal?: Terminal;

    @OneToMany(() => Hop, hop => hop.run)
    route = new Collection<Hop>(this);
}