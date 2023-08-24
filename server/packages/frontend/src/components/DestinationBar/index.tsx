import styled from 'styled-components';
import DestinationBlock from './DestinationBlock';
import { config } from '@/config';
import { RunHopType } from '@/data/generated';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${config.destinationBar.blockSpacer}px;
    margin-left: ${config.destinationBar.spaceLeft}px;
`

export default function DestinationBar() {

    return (
        <Container>
            <DestinationBlock banner={RunHopType.Recommended}/>
            <DestinationBlock banner={RunHopType.Previous}/>
            <DestinationBlock />
        </Container>
    )
}