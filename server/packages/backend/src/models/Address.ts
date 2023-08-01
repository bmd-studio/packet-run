import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Address {
    @Field()
    ip: string;

    @Field({ nullable: true })
    operator?: string;

    @Field({ nullable: true })
    asn?: number;

    @Field()
    updatedAt: Date;
}