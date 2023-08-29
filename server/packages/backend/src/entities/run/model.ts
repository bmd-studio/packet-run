import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import Address from '../address/model';
import Terminal from '../terminal/model';
import TracerouteHop from '../tracerouteHop/model';
import { Rel } from '@mikro-orm/core';
import RunHop from '../runHop/model';
import { RunPacketType } from './index.entity';

registerEnumType(RunPacketType, { name: 'RunPacketType' });

@ObjectType()
export default class Run {
    @Field()
    id: string;
    
    @Field({ nullable: true })
    nfcId?: string;

    @Field()
    url: string;

    @Field(() => Address, { nullable: true })
    destination: Address;

    @Field(() => Terminal, { nullable: true })
    terminal: Rel<Terminal>;

    @Field(() => Terminal)
    server: Rel<Terminal>;

    @Field()
    isTracerouteFinished: boolean;

    @Field(() => [TracerouteHop], { description: 'The internet hops a packet would actually take when transmitted in real life. NOTE: Look at the `hops` field if you want the hops that pertain specifically to the installation', deprecationReason: 'You shouldn\'t need this field on the front-end. Please use `hops` instead.' })
    tracerouteHops: TracerouteHop[];

    @Field(() => [RunHop], { description: 'The hops that have been identified for this route in the context of the installation.' })
    hops: RunHop[];

    @Field()
    packetType: RunPacketType;

    @Field({ description: 'The index of the RunHop where the run is currently at' })
    currentHopIndex: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field({ nullable: true })
    imagePath?: string;
}