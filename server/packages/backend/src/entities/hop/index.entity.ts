import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import 'reflect-metadata';
import Address from '../address/index.entity';
import Terminal from '../terminal/index.entity';
import Run from '../run/index.entity';

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