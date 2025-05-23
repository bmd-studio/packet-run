import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class ImageStaticLoader implements OnModuleInit {
    private readonly logger = new Logger(ImageStaticLoader.name);

    constructor(private httpAdapterHost: HttpAdapterHost) {}

    public onModuleInit() {
        // Retrieve the Fastify instance
        const app = this.httpAdapterHost.httpAdapter.getInstance();

        // Register the static middleware
        app.register(fastifyStatic, {
            root: path.join(process.cwd(), 'data', 'images'),
            wildcard: true,
            prefix: '/images',
        });

        this.logger.log('Registered image static loader');
    }
}