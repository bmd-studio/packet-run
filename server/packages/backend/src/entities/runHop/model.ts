import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import Address from '../address/model';
import Run from '../run/model';
import { Rel } from '@mikro-orm/core';
import Terminal from '../terminal/model';
import { RunHopStatus, RunHopType } from './index.entity';

registerEnumType(RunHopStatus, { 
    name: 'RunHopStatus', 
    description: 'Describes the current status of this hop: has it already been taken or merely been suggested...',
    valuesMap: {
        ACTUAL: { description: 'The hop was actually taken by a user action' },
        POTENTIAL: { description: 'The hop is potential option for the user to take' },
    },
});

registerEnumType(RunHopType, { 
    name: 'RunHopType', 
    description: 'Describes the label that is attached to the hop',
    valuesMap: {
        ALTERNATIVE: { description: 'The hop is taken as an alternative to an advised hop' },
        PREVIOUS: { description: 'The hop takes the user backwards to a previously visited hop' },
        RECOMMENDED: { description: 'The hop takes the user in the recommended direction' },
    },
});

@ObjectType({ description: 'This describes an hop in the context of the installation. It is either a previous hop that has been taken by the user, or it is an option for the user in the future.' })
export default class RunHop {
    @Field()
    id!: number;

    @Field(() => Address, { nullable: true })
    address: Address;

    @Field(() => RunHopType)
    type: RunHopType;

    @Field(() => Terminal)
    terminal: Rel<Terminal>;

    @Field(() => Run)
    run: Rel<Run>;

    @Field(() => RunHopStatus)
    status: RunHopStatus;

    @Field()
    mayPerformTransformation: boolean;
    
    @Field()
    hop: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}