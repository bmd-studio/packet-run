import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import 'reflect-metadata';
import Address from '../address/index.entity';
import Run from '../run/index.entity';

@Entity()
export default class Hop {
    @PrimaryKey()
    id!: number;

    @OneToOne(() => Address, { unique: false, nullable: true })
    address: Rel<Address>;

    @ManyToOne(() => Run)
    run: Rel<Run>;

    @Property()
    hop: number;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}