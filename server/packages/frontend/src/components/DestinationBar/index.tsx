import styled, { css } from 'styled-components';
import { theme, MODE } from '@/config';
import { RegisterTerminalRunHopFragment, RunHopType, TerminalType } from '@/data/generated';
import { useTerminal } from '../RegisterTerminal';
import Link from 'next/link';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateDistance } from './distance';
import retrieveLatestKnownHop, { PartialRun } from '@/lib/latestKnownHop';
import React from 'react';
import RouteCard, { RouteTypes } from '../RouteCard';
import { RouteType } from 'next/dist/lib/load-custom-routes';
import { getAmountOfAlternativeHops } from '@/lib/hopHelpers';
import DestinationExplanation from './routeText';

const Container = styled.div`
    position: absolute;
    z-index: 3;
    top: 0px;
    left: 0px;
    width: 100vw;
    box-sizing:border-box;
    padding-left: 244px;
    padding-right: 244px;
    display: flex;
    flex-direction: row;
    gap: 72px;
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
    console.log({ sortedHops });
    const latestKnownHop = retrieveLatestKnownHop(run);

    const RouteCards = sortedHops.map((hop, index) => {
        if (!hop) {
            return null;
        }
        const city = hop?.address?.info?.location?.city || undefined;
        const country = hop?.address?.info?.location?.country.code;
        const owner = hop?.address?.info?.company.name || hop?.address?.info?.carrier?.name || undefined;
        const distance = calculateDistance(latestKnownHop, hop as unknown as RegisterTerminalRunHopFragment);
        const name = `Route ${index + 1}`;
        let destinationName = `${city ? city : ''} ${country ? `(${country})` : ''}`;
        const hopType = runHopTypeToRouteLabel(hop?.type);
        if (!city && !country) {
            destinationName = '???';
        }

        return (
            <Link

                key={hop?.id || `null-hop-${index}`}
                href={`/${hop?.terminal.type.toLowerCase()}/${hop?.terminal.id}?nfcId=${run.nfcId || ''}`}
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


    });

    if (!run?.availableHops) {
        return null;
    }
    return (
        <Container>
            {RouteCards}
        </Container>
    )
}

