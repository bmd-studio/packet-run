import styled from 'styled-components';
import { RegisterTerminalRunHopFragment, RunHopType, TerminalType } from '@/data/generated';
import { useTerminal } from '../RegisterTerminal';
import Link from 'next/link';
import { useMemo } from 'react';
import { calculateDistance } from './distance';
import retrieveLatestKnownHop from '@/lib/latestKnownHop';
import React from 'react';
import RouteCard, { RouteTypes } from '../RouteCard';
import DestinationExplanation from './routeText';

const Container = styled.div`
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    width: 100vw;
    box-sizing:border-box;
    padding-left: 217px;
    padding-right: 244px;
    display: flex;
    flex-direction: row;
    gap: 90px;
`;
function runHopTypeToRouteLabel(hopType: RunHopType | undefined): RouteTypes | undefined {
    let res: undefined | RouteTypes = undefined;
    switch (hopType) {
        case RunHopType.Alternative:
            res = 'alternative';
            break;
        case RunHopType.Invalid:
            break;
        case RunHopType.Previous:
            res = 'back';
            break;
        case RunHopType.Recommended:
            res = 'recommended';
            break;
        case RunHopType.Wormhole:
            res = 'wormhole';
            break;
    }
    return res;

}

export default function DestinationBar() {
    const { connectionsTo, run } = useTerminal();

    const sortedConnections = useMemo(() => (
        connectionsTo.sort((a, b) => a.slot - b.slot)
    ), [connectionsTo]);

    const sortedHops = useMemo(() => (
        sortedConnections.map(({ to }) => (
            run?.availableHops.find((h) => h.terminal.id === to.id) || null
        ))
    ), [sortedConnections, run]);

    const latestKnownHop = useMemo(() => retrieveLatestKnownHop(run), [run] );

    const ConnectionCards = useMemo(() => sortedConnections.map((conn, index) => {
        return (
            <RouteCard
                key={`${index}-${conn.to.id}-${conn.slot}`}
                name={`Route ${index + 1}`}
            />
        );
    }), [sortedConnections]);

    const RouteCards = useMemo(() => sortedHops.map((hop, index) => {
        // GUARD: If the hop is not found, return null
        if (!hop) {
            return null;
        }

        // Get the city, country, owner, and distance
        const city = hop?.address?.info?.location?.city || undefined;
        const country = hop?.address?.info?.location?.country.code;
        const owner = hop?.address?.info?.company.name || hop?.address?.info?.carrier?.name || undefined;
        const name = `Route ${index + 1}`;

        // Calculate the distance
        const distance = calculateDistance(latestKnownHop, hop as unknown as RegisterTerminalRunHopFragment);
        const hopType = runHopTypeToRouteLabel(hop?.type);
        const goesBackHome = hop.type === RunHopType.Recommended && hop.terminal.type === TerminalType.Receiver;

        const destinationName = city || country || goesBackHome
            ? `${city ? city : ''} ${country ? `(${country})` : ''}`
            : '???';

        return (
            <Link
                key={hop?.id || `null-hop-${index}`}
                href={`/${hop?.terminal.type.toLowerCase()}/${hop?.terminal.id}?nfcId=${run?.nfcId || ''}`}
                prefetch={false}
            >
                <RouteCard
                    key={name}
                    name={name}
                    destination={destinationName}
                    owner={owner}
                    distance={distance}
                    type={hopType}
                >
                    <DestinationExplanation
                        hop={hop as unknown as RegisterTerminalRunHopFragment}
                        run={run} />
                </RouteCard>
            </Link>
        )
    }), [sortedHops, run, latestKnownHop]);

    if (!run?.availableHops
        || sortedHops.length === 0
        || sortedHops.every((h) => h === null)
    ) {
        return (
            <Container>
                {ConnectionCards}
            </Container>
        );
    }
    return (
        <Container>
            {RouteCards}
        </Container>
    )
}

