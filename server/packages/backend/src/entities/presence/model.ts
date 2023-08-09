import { Field, ObjectType } from '@nestjs/graphql';
import Terminal from '../terminal/model';
import { Rel } from '@mikro-orm/core';

@ObjectType()
export default class Presence {
    @Field()
    id!: number;

    @Field(() => Terminal)
    terminal!: Rel<Terminal>;

    @Field()
    ip!: string;

    @Field()
    websocketId!: string;

    @Field()
    connectedAt: Date;

    @Field()
    lastSeenAt: Date;
}