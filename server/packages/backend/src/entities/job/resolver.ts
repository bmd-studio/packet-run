import { InjectQueue, OnQueueEvent, QueueEventsHost, QueueEventsListener} from '@nestjs/bullmq';
import { Resolver, Subscription } from '@nestjs/graphql';
import { Job, JobStatus } from './model';
import { BehaviorSubject, map } from 'rxjs';
import { Queue, Job as BullJob } from 'bullmq';
import { observableToAsyncIterable } from '@graphql-tools/utils';

@Resolver(() => Job)
@QueueEventsListener('default')
export class JobsResolver extends QueueEventsHost {
    observable = new BehaviorSubject<Job[]>([]);

    constructor(
        @InjectQueue('default') private queue: Queue,
    ) {
        super();
    }

    async getStatusForJob(job: BullJob) {
        if (await job?.isCompleted?.()) {
            return JobStatus.COMPLETED;
        } else if (await job?.isActive?.()) {
            return JobStatus.ACTIVE;
        } else if (await job?.isFailed?.()) {
            return JobStatus.FAILED;
        } else if (await job?.isWaiting?.()) {
            return JobStatus.WAITING;
        } else if (await job?.isDelayed?.()) {
            return JobStatus.DELAYED;
        } else {
            return JobStatus.OTHER;
        }
    }

    @OnQueueEvent('active')
    @OnQueueEvent('completed')
    @OnQueueEvent('failed')
    @OnQueueEvent('delayed')
    @OnQueueEvent('waiting')
    async updateObservable() {
        // Retrieve all jobs
        const jobs = await this.queue.getJobs(['active', 'waiting', 'delayed', 'failed']);

        // Retrieve statuses for all jobs
        const jobsWithStatus = await Promise.all(
            jobs.map(async(job) => {
                const status = await this.getStatusForJob(job);
                return {
                    ...job,
                    status,
                };
            }),
        );

        // Filter any with 'completed' status
        const filteredJobs = jobsWithStatus.filter((job) => job.status !== JobStatus.COMPLETED);

        this.observable.next(filteredJobs);
    }

    @Subscription(() => [Job])
    async jobs() {
        return observableToAsyncIterable(
            this.observable.pipe(map((jobs) => ({ jobs })))
        );
    }
}