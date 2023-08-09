import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TerminalStatus, TerminalType } from './index.entity';
import Run from '../run/model';
import { Rel } from '@mikro-orm/core';
import Presence from '../presence/model';

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

    @Field(() => [Presence])
    presences: Rel<Presence[]>;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}