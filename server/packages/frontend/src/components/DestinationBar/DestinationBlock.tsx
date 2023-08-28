import { config } from '@/config';
import { RunHopType } from '@/data/generated';
import styled from 'styled-components';

interface Props {
  banner?: RunHopType;
}

const Container = styled.div`
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

export default function DestinationBlock(props: Props) {
    const { banner } = props;

    return (
        <Container>
            <Content>
                <h1>Eindhoven (NL)</h1>
                <p>IP ADRESS: 62.195.163.21</p>
                <p>OWNER: YOU</p>
                <p>DISTANCE: 130 KM</p>
                <p>CARBON FOOTPRINT: 0.43 KWh</p>
            </Content>
            {banner && <Banner banner={banner}>
                {/* check explicitly for previous */}
                {banner === RunHopType.Recommended ? 'RECOMMENDED' : 'PREVIOUS STOP'}
            </Banner>}
        </Container>
    )
}