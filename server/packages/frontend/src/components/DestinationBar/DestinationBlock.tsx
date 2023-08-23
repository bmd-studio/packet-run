import { config } from '@/config';
import styled from 'styled-components';

interface Props {
  banner?: 'RECOMMNEDED' | 'PREVIOUS';
}

export default function DestinationBlock(props: Props) {
    const { banner } = props;
    const Container = styled.div`
        width: ${config.destinationBar.destinationBlock.width}px;
    `;
        
    const Content = styled.div`
        background-color: var(--dark-gray);
        padding: 32px;
        color: var(--light-gray);
    `;

    const Banner = styled.div`
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${banner === 'RECOMMNEDED' ? 'var(--yellow)' : 'var(--light-gray)'}
    `;

    return (
        <Container>
            <Content>
                <h1>Eindhoven (NL)</h1>
                <p>IP ADRESS: 62.195.163.21</p>
                <p>OWNER: YOU</p>
                <p>DISTANCE: 130 KM</p>
                <p>CARBON FOOTPRINT: 0.43 KWh</p>
            </Content>
            {banner && <Banner>
                {banner === 'RECOMMNEDED' ? 'RECOMMNEDED' : 'PREVIOUS STOP'}
            </Banner>}
        </Container>
    )
}