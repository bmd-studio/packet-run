import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

/** The HTTP link for regular queries and mutations */
const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

/** The WS link for subcsriptions */
const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:8080/graphql' }));

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
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;