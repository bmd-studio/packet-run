import { ApolloClient, HttpLink, InMemoryCache, from, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { RetryLink } from '@apollo/client/link/retry';
import { createClient } from 'graphql-ws';
import { BACKEND_URL, ORIGIN } from '@/config';

/** The HTTP link for regular queries and mutations */
const httpLink = new HttpLink({ uri: `${BACKEND_URL}/graphql` });

/** The WS link for subcsriptions */
const wsLink = new GraphQLWsLink(createClient({ url: `ws://${ORIGIN}:8080/graphql` }));

/** A link that retries when any network errors occur */
const retryLink = new RetryLink({
    delay: {
        initial: 200,
        max: Infinity,
        jitter: true,
    },
    attempts: {
        max: Infinity,
    },
});

/**
 * Split out the links so that only subscriptions are routed over websockets
 * while all other operations are routed over HTTP.
 */
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: from([ retryLink, splitLink, ]),
    cache: new InMemoryCache(),
});

export default client;