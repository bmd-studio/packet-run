import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job {
    @Field()
    name: string;

    @Field({ nullable: true })
    id?: string;

    @Field()
    attemptsMade: number;

    @Field({ nullable: true })
    processedOn?: number;

    @Field({ nullable: true })
    finishedOn?: number;

    @Field({ nullable: true })
    failedReason?: string;

    @Field({ nullable: true })
    stacktrace?: string[];

    @Field()
    timestamp: number;

    @Field()
    data: string;
}