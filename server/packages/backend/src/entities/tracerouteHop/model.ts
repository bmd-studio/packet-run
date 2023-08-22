import { Field, ObjectType } from '@nestjs/graphql';
import Address from '../address/model';
import Run from '../run/model';
import { Rel } from '@mikro-orm/core';

@ObjectType({ description: 'This describes a hop that was retrieved by running traceroute to the destionation. It is an existing hop that would ahve been taken were the packet routed over the internet.' })
export default class TracerouteHop {
    @Field()
    id!: number;

    @Field(() => Address)
    address: Address;

    @Field(() => Run)
    run: Rel<Run>;
    
    @Field()
    hop: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}