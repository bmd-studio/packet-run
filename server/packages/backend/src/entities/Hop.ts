import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import 'reflect-metadata';
import Address from './Address';
import Terminal from './Terminal';
import Run from './Run';

@Entity()
export default class Hop {
    @PrimaryKey()
    id!: number;

    @OneToOne()
    address: Address;

    @OneToOne()
    terminal: Terminal;

    @ManyToOne()
    run: Run;

    @Property()
    hop: number;
}