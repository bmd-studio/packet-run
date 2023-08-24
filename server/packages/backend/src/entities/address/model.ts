import { Field, ObjectType } from '@nestjs/graphql';
import IpInfo from './ipinfo.model';

@ObjectType()
export default class Address {
    @Field()
    ip: string;

    @Field({ nullable: true })
    info?: IpInfo;

    @Field()
    isInAltNetwork: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}