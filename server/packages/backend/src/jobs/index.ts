import { MikroORM } from '@mikro-orm/core';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import traceroute from './traceroute';
import website from './website';
import whois from './whois';

/** A type union for all possible job types */
type AnyJob = Job<string, void, 'traceroute'>
    | Job<string, void, 'website'>
    | Job<string, void, 'whois'>;

/**
 * This class handles all jobs that come in on the `default` queue.
 */
@Processor('default')
@Injectable()
export default class JobProcessor extends WorkerHost {
    constructor(
        private readonly orm: MikroORM,
    ) {
        super();
    }

    async process(job: AnyJob): Promise<any> {
        // Switch based on job name and distribute to the right function call
        switch (job.name) {
            case 'traceroute':
                return traceroute(job.data, this.orm);
            case 'website':
                return website(job.data, this.orm);
            case 'whois':
                return whois(job.data, this.orm);
            default:
                throw new Error(`Process ${(job as Job).name} not implemented`);
        }
    }
}