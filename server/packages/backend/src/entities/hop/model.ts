import { Field, ObjectType } from '@nestjs/graphql';
import Address from '../address/model';
import Run from '../run/model';
import { Rel } from '@mikro-orm/core';

@ObjectType()
export default class Hop {
    @Field()
    id!: number;

    @Field(() => Address, { nullable: true })
    address?: Address;

    @Field(() => Run)
    run: Rel<Run>;
    
    @Field()
    hop: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}