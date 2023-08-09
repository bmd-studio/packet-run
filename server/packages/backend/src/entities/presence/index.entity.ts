import { Entity, ManyToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import Terminal from '../terminal/index.entity';

@Entity()
export default class Presence {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Terminal)
    terminal!: Rel<Terminal>;

    @Property()
    ip!: string;

    @Property()
    websocketId!: string;

    @Property()
    connectedAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    lastSeenAt: Date = new Date();
}