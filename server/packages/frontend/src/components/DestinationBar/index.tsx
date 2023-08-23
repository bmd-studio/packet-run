import styled from 'styled-components';
import DestinationBlock from './DestinationBlock';
import { config } from '@/config';


export default function DestinationBar() {
    const Container = styled.div`
      display: flex;
      flex-direction: row;
      gap: ${config.destinationBar.blockSpacer}px;
      margin-left: ${config.destinationBar.spaceLeft}px;
    `

    return (
        <Container>
            <DestinationBlock banner='RECOMMNEDED'/>
            <DestinationBlock banner='PREVIOUS'/>
            <DestinationBlock />
        </Container>
    )
}