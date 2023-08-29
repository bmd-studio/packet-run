import styled from 'styled-components';
import { config } from '@/config';
import { RunHopType } from '@/data/generated';
import { useTerminal } from '../RegisterTerminal';

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

const Banner = styled.div<{banner: RunHopType}>`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.banner === RunHopType.Recommended ? 'var(--yellow)' : 'var(--light-gray)'};
`;

export default function DestinationBar() {
    const hops = useTerminal((t) => t.run?.currentHops);

    if (!hops) {
        return null;
    }

    return (
        <Container>
            {hops.map((hop) => (
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
                        <p>DISTANCE: 130 KM</p>
                        <p>CARBON FOOTPRINT: 0.43 KWh</p>
                    </Content>
                    {/* {banner && <Banner banner={banner}> */}
                    {/* check explicitly for previous */}
                    {/* {banner === RunHopType.Recommended ? 'RECOMMENDED' : 'PREVIOUS STOP'} */}
                    {/* </Banner> */}
                </Destination>
            ))}
        </Container>
    )
}