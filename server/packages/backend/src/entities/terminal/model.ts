import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TerminalStatus, TerminalType } from './index.entity';
import Run from '../run/model';
import { Rel } from '@mikro-orm/core';

registerEnumType(TerminalType, { name: 'TerminalType' });
registerEnumType(TerminalStatus, { name: 'TerminalStatus' });

@ObjectType()
export default class Terminal {
    @Field()
    id: number;

    @Field()
    type: TerminalType;

    @Field()
    status: TerminalStatus;

    @Field({ nullable: true })
    payload?: string;

    @Field(() => [Terminal])
    connectionsTo: Terminal[];

    @Field(() => [Terminal])
    connectionsFrom: Terminal[];

    @Field(() => Run, { nullable: true })
    run?: Rel<Run>;

    @Field()
    lastSeenAt: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}