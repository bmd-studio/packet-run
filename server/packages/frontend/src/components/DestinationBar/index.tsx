import styled from 'styled-components';
import { config } from '@/config';
import { RunHopType } from '@/data/generated';
import { useTerminal } from '../RegisterTerminal';
import { DEBUG } from '@/lib/config';
import Link from 'next/link';

const UNKNOWN = '???';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${config.destinationBar.blockSpacer}px;
    margin-left: ${config.destinationBar.spaceLeft}px;
`
const Destination = styled.div`
    width: ${config.destinationBar.destinationBlock.width}px;
`;
        
const Content = styled.div`
    background-color: var(--dark-gray);
    padding: 32px;
    color: var(--light-gray);
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

const Banner = styled.div<{ highlighted: boolean }>`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.highlighted ? 'var(--yellow)' : 'var(--light-gray)'};
`;

export default function DestinationBar() {
    const { connectionsTo, run } = useTerminal();

    if (!run?.currentHops) {
        return null;
    }

    return (
        <>
            {DEBUG && (
                <Container>
                    {connectionsTo.sort((a, b) => a.slot - b.slot).map((c) => (
                        <Destination key={c.to.id}>
                            <TerminalConnection href={`/${c.to.type.toLowerCase()}/${c.to.id}?nfcId=${run.nfcId}`}>
                                TO TERMINAL {c.to.id} (SLOT #{c.slot})
                            </TerminalConnection>
                        </Destination>
                    ))}
                </Container>
            )}
            <Container>
                {run.currentHops.map((hop) => (
                    <Destination key={hop.address.ip}>
                        <Content>
                            <h1>
                                {hop.address.info
                                    ? <>{hop.address.info?.location.city} ({hop.address.info?.location.country.code})</>
                                    : UNKNOWN
                                }
                            </h1>
                            <p>IP ADRESS: {hop.address.ip}</p>
                            <p>OWNER: {hop.address.info?.carrier.name || UNKNOWN}</p>
                            <p>DISTANCE: {UNKNOWN}</p>
                            <p>CARBON FOOTPRINT: {UNKNOWN}</p>
                        </Content>
                        <Banner highlighted={hop.type === RunHopType.Recommended}>
                            {hop.type}
                        </Banner>
                    </Destination>
                ))}
            </Container>
        </>
    )
}