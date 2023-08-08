import { Field, ObjectType } from '@nestjs/graphql';
import Address from '../address/model';
import Terminal from '../terminal/model';
import Run from '../run/model';
import { Rel } from '@mikro-orm/core';

@ObjectType()
export default class Hop {
    @Field()
    id!: number;

    @Field(() => Address)
    address: Address;

    @Field(() => Terminal)
    terminal: Rel<Terminal>;

    @Field(() => Run)
    run: Rel<Run>;
    
    @Field()
    hop: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}