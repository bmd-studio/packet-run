import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Context as ContextDecorator } from '@nestjs/graphql';
import type { Context  } from 'graphql-ws';
import { Extra } from 'graphql-ws/lib/use/ws';

type GraphQLContext = Context<Record<string, unknown>, Extra & Partial<Record<PropertyKey, never>>>

/**
 * Retrieve the id for a client that is supplied via the Sec-Websocket-Key header
 */
const WebsocketId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const [, , context] = ctx.getArgs() as [unknown, unknown, { req: GraphQLContext }];
        return context.req.extra.request.headers['sec-websocket-key'];
    },
    [ContextDecorator],
);

export default WebsocketId;