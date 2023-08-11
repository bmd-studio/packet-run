import { Field, ObjectType } from '@nestjs/graphql';
import Address from '../address/model';
import Terminal from '../terminal/model';
import Hop from '../hop/model';
import { Rel } from '@mikro-orm/core';

@ObjectType()
export default class Run {
    @Field()
    id: string;
    
    @Field({ nullable: true })
    nfcId?: string;

    @Field()
    url: string;

    @Field(() => Address)
    destination: Address;

    @Field(() => [Address])
    hops: Address[];

    @Field(() => Terminal, { nullable: true })
    terminal: Rel<Terminal>;

    @Field(() => [Hop])
    route: Hop[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}