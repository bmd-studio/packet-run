import { MikroORM } from '@mikro-orm/core';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import traceroute from './traceroute';
import website from './website';
import whois from './whois';
import { IpregistryClient } from '@ipregistry/client';
import { ConfigService } from '@nestjs/config';
import { Location } from '../entities/address/ipinfo.model';

/** A type union for all possible job types */
type AnyJob = Job<string, void, 'traceroute'>
    | Job<string, void, 'website'>
    | Job<string, void, 'whois'>;

/**
 * This class handles all jobs that come in on the `default` queue.
 */
@Processor('default', { concurrency: 10, removeOnComplete: { age: 0 } })
@Injectable()
export default class JobProcessor extends WorkerHost {
    protected defaultLocation: Location;
    protected defaultCompany: string;

    constructor(
        private readonly orm: MikroORM,
        private readonly client: IpregistryClient,
        private readonly config: ConfigService,
    ) {
        super();

        this.defaultLocation = JSON.parse(this.config.get('DEFAULT_LOCATION') || '{}');
        this.defaultCompany = this.config.get('DEFAULT_COMPANY');
    }

    async process(job: AnyJob): Promise<any> {
        // Switch based on job name and distribute to the right function call
        switch (job.name) {
            case 'traceroute':
                return traceroute(job.data, this.orm);
            case 'website':
                return website(job.data, this.orm);
            case 'whois':
                return whois(job.data, this.orm, this.client, this.defaultLocation, this.defaultCompany);
            default:
                throw new Error(`Process ${(job as Job).name} not implemented`);
        }
    }
}