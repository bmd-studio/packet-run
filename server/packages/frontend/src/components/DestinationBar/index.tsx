import styled, { css } from 'styled-components';
import { theme, MODE } from '@/config';
import { RunHopType, TerminalType } from '@/data/generated';
import { useTerminal } from '../RegisterTerminal';
import Link from 'next/link';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import displayDistance from './distance';
import retrieveLatestKnownHop from '@/lib/latestKnownHop';
import React from 'react';
import RouteCard from '../RouteCard';

//const UNKNOWN = '???';
//
//const Fixed = styled(motion.div)`
//    position: fixed;
//    top: 0;
//    left: ${theme.destinationBar.spaceLeft}px;
//    z-index: 3;
//    will-change: transform;
//`;
//
//const Container = styled.div`
//    display: flex;
//    flex-direction: row;
//    gap: ${theme.destinationBar.blockSpacer}px;
//`
//const Destination = styled(Link)`
//    width: ${theme.destinationBar.destinationBlock.width}px;
//    transition: opacity 0.2s ease-in-out;
//
//    &:hover {
//        opacity: 0.9;
//    }
//`;
//
//const Content = styled.div`
//    background-color: var(--dark-gray);
//    padding: 32px;
//    color: var(--light-gray);
//
//    p {
//        font-size: 14px;
//    }
//`;
//
//const Banner = styled.h2<{ $highlighted: boolean }>`
//  height: 48px;
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  font-size: 20px;
//  background-color: ${(props) => props.$highlighted ? 'var(--yellow)' : 'var(--light-gray)'};
//  color: black;
//  gap: 12px;
//
//  ${(props) => props.$highlighted && css`
//    background-color: var(--yellow);
//  `};
//`;
//
//const Icon = styled.img`
//    width: 18px;
//    height: auto;
//    image-rendering: pixelated;
//`;
//
//export default function DestinationBar() {
//    const { connectionsTo, run, type } = useTerminal();
//    const sortedConnections = useMemo(() => (
//        connectionsTo.sort((a, b) => a.slot - b.slot)
//    ), [connectionsTo]);
//    const sortedHops = useMemo(() => (
//        sortedConnections.map(({ to }) => (
//            run?.availableHops.find((h) => h.terminal.id === to.id) || null
//        ))
//    ), [sortedConnections, run]);
//    const latestKnownHop = retrieveLatestKnownHop(run);
//
//    if (!run?.availableHops) {
//        return null;
//    }
//
//    return (
//        <Fixed
//            key="destination-bar"
//            initial={{ y: '-100%' }}
//            animate={{ y: MODE === 'standalone' ? 54 : 0 }}
//            transition={{ duration: 2, delay: 1 }}
//            exit={{ y: '-100%' }}
//        >
//            <Container>
//                {sortedHops.map((hop, i) => (
//                    <Destination
//                        key={hop?.id || `null-hop-${i}`}
//                        href={`/${hop?.terminal.type.toLowerCase()}/${hop?.terminal.id}?nfcId=${run.nfcId}`}
//                    >
//                        {hop && (
//                            <div>
//                                <Content>
//                                    <h1>
//                                        {hop.address?.info
//                                            ? <>{hop.address.info?.location?.city} ({hop.address.info?.location?.country.code})</>
//                                            : UNKNOWN
//                                        }
//                                    </h1>
//                                    <p>IP address: {hop.address?.ip || UNKNOWN}</p>
//                                    <p>Owner: {hop.address?.info?.carrier?.name || hop.address?.info?.company.name || UNKNOWN}</p>
//                                    <p>
//                                        Distance:
//                                        {' '}
//                                        {displayDistance(latestKnownHop, hop)}
//                                    </p>
//                                </Content>
//                                <Banner
//                                    $highlighted={
//                                        hop.type === RunHopType.Recommended
//                                        || hop.type === RunHopType.Wormhole
//                                    }
//                                >
//                                    {hop.terminal.type === TerminalType.Gateway && (
//                                        <Icon src="/house.png" />
//                                    )}
//                                    {hop.terminal.type === TerminalType.Server && (
//                                        <Icon src="/cloud.png" />
//                                    )}
//                                    {(hop.terminal.type === TerminalType.Receiver
//                                        || hop.terminal.type === TerminalType.Sender) && 
//                                    (
//                                        <Icon src="/computer.png" />
//                                    )}
//                                    {hop.terminal.type === TerminalType.Router
//                                        && type === TerminalType.Gateway && 
//                                    (
//                                        <Icon src="/globe.png" />
//                                    )}
//                                    {hop.type}
//                                </Banner>
//                            </div>
//                        )}
//                    </Destination>
//                ))}
//            </Container>
//        </Fixed>
//    )
//}
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

export default function DestinationBar() {
    const { connectionsTo, run, type } = useTerminal();
    const sortedConnections = useMemo(() => (
        connectionsTo.sort((a, b) => a.slot - b.slot)
    ), [connectionsTo]);
    const sortedHops = useMemo(() => (
        sortedConnections.map(({ to }) => (
            run?.availableHops.find((h) => h.terminal.id === to.id) || null
        ))
    ), [sortedConnections, run]);
    const latestKnownHop = retrieveLatestKnownHop(run);

    if (!run?.availableHops) {
        return null;
    }
    return (
        <Container>
            <RouteCard name="Route 1" destination='AMSTERDAM (NL)' explanation='Wij hebben alvast gekeken. Amsterdam is de kortste route.' owner="Ziggo NL" distance={130} type='recommended' />
            <RouteCard name="Route 2" />
            <RouteCard name="Route 3" />
        </Container>
    )
}

