import 'reflect-metadata';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export default class Address { 
    @PrimaryKey()
    ip!: string;

    @Property({ nullable: true })
    operator?: string;
    
    @Property({ nullable: true })
    asn?: number;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
} 