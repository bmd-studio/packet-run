import styled, { css } from 'styled-components';
import { theme, DEBUG, LOCATION_NAME } from '@/config';
import { RunHopType } from '@/data/generated';
import { useTerminal } from '../RegisterTerminal';
import Link from 'next/link';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

const UNKNOWN = '???';

const Fixed = styled(motion.div)`
    position: fixed;
    top: 0;
    left: ${theme.destinationBar.spaceLeft}px;
    z-index: 3;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${theme.destinationBar.blockSpacer}px;
`
const Destination = styled.div`
    width: ${theme.destinationBar.destinationBlock.width}px;
`;
        
const Content = styled.div`
    background-color: var(--dark-gray);
    padding: 32px;
    color: var(--light-gray);

    p {
        font-size: 14px;
    }
`;

const TerminalConnection = styled(Content).attrs({ 
    as: Link 
})`
    display: block;
    padding: 16px 32px 16px 32px;  

    &:hover {
        opacity: 0.8;
    }
`;

const Banner = styled.h2<{ $highlighted: boolean }>`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${(props) => props.$highlighted ? 'var(--yellow)' : 'var(--light-gray)'};
  color: black;

  ${(props) => props.$highlighted && css`
    background-color: var(--yellow);
  `};
`;

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

    if (!run?.availableHops) {
        return null;
    }

    return (
        <Fixed initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: 2, delay: 1 }} exit={{ y: '-100%' }}>
            {DEBUG && (
                <Container>
                    {sortedConnections.map((c) => (
                        <Destination key={c.to.id}>
                            <TerminalConnection href={`/${c.to.type.toLowerCase()}/${c.to.id}?nfcId=${run.nfcId}`}>
                                TO TERMINAL {c.to.id} (SLOT #{c.slot})
                            </TerminalConnection>
                        </Destination>
                    ))}
                </Container>
            )}
            <Container>
                {sortedHops.map((hop) => hop && (
                    <Destination key={hop.id}>
                        <Content>
                            {hop.address?.isInternalIP ? (
                                <h1>{LOCATION_NAME}</h1>
                            ): (
                                <h1>
                                    {hop.address?.info
                                        ? <>{hop.address.info?.location.city} ({hop.address.info?.location.country.code})</>
                                        : UNKNOWN
                                    }
                                </h1>
                            )}
                            <p>IP address: {hop.address?.ip || UNKNOWN}</p>
                            <p>Owner: {hop.address?.info?.carrier.name || UNKNOWN}</p>
                            <p>Distance: {UNKNOWN}</p>
                        </Content>
                        <Banner $highlighted={hop.type === RunHopType.Recommended}>
                            {hop.type}
                        </Banner>
                    </Destination>
                ))}
            </Container>
        </Fixed>
    )
}