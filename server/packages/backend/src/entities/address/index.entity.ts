import 'reflect-metadata';
import { Entity, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { IpInfo } from '@ipregistry/client';

@Entity()
export default class Address { 
    @PrimaryKey()
    ip!: string;
    
    @Property({ nullable: true })
    info?: Rel<IpInfo>;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
} 