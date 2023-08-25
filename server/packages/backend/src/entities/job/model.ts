import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum JobStatus {
    ACTIVE = 'active',
    WAITING = 'waiting',
    DELAYED = 'delayed',
    FAILED = 'failed',
    COMPLETED = 'completed',
    OTHER = 'other',
}

registerEnumType(JobStatus, { name: 'JobStatus' });

@ObjectType()
export class Job {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    attemptsMade: number;

    @Field({ nullable: true })
    processedOn?: number;

    @Field({ nullable: true })
    finishedOn?: number;

    @Field({ nullable: true })
    failedReason?: string;

    @Field(() => [String], { nullable: true })
    stacktrace?: string[];

    @Field({ nullable: true})
    timestamp: number;

    @Field(() => JobStatus)
    status: JobStatus;

    @Field({ nullable: true })
    data: string;
}