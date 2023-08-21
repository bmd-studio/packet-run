import { InjectQueue, OnQueueEvent, QueueEventsHost, QueueEventsListener } from '@nestjs/bullmq';
import { Resolver, Subscription } from '@nestjs/graphql';
import { Job } from './model';
import { BehaviorSubject, map } from 'rxjs';
import { Queue } from 'bullmq';

@Resolver(() => Job)
@QueueEventsListener('default')
export class JobsResolver extends QueueEventsHost {
    observable = new BehaviorSubject<Job[]>([]);

    constructor(
        @InjectQueue('default') private queue: Queue
    ) {
        super();
    }

    @OnQueueEvent('active')
    @OnQueueEvent('completed')
    @OnQueueEvent('failed')
    @OnQueueEvent('delayed')
    @OnQueueEvent('waiting')
    async updateObservable(...args) {
        console.log('EVENT', args);
        const jobs = await this.queue.getJobs(['active', 'waiting', 'delayed', 'completed', 'failed']);
        this.observable.next(jobs);
    }

    @Subscription(() => [Job])
    async jobs() {
        return this.observable.pipe(map((jobs) => ({ jobs })));
    }
}