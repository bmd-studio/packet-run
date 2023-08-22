import { Entity, Enum, ManyToOne, OneToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import 'reflect-metadata';
import Address from '../address/index.entity';
import Run from '../run/index.entity';
import Terminal from '../terminal/index.entity';

export enum RunHopStatus {
    ACTUAL = 'actual',
    POTENTIAL = 'potential',
}

export enum RunHopType {
    PREVIOUS = 'previous',
    ALTERNATIVE = 'alternative',
    RECOMMENDED = 'recommended',
}

@Entity()
export default class RunHop {
    @PrimaryKey()
    id!: number;

    @OneToOne(() => Address, { unique: false })
    address: Rel<Address>;

    @Enum(() => RunHopType)
    type: RunHopType;
    
    @OneToOne(() => Terminal, { unique: false })
    terminal: Rel<Terminal>;

    @ManyToOne(() => Run)
    run: Rel<Run>;

    @Enum(() => RunHopStatus)
    status: RunHopStatus;

    @Property()
    hop: number;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}