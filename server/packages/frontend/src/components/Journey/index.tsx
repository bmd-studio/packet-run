import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTerminal } from '../RegisterTerminal';
import { LOCATION_NAME } from '@/config';

const Container = styled(motion.div)`
    position: absolute;
    left: 32px;
    bottom: 32px;
    display: flex;
    gap: 8px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Label = styled.span`
    display: inline-flex;
    flex: 0;
    background-color: var(--dark-gray);
    color: var(--yellow);
    text-transform: uppercase;
    font-family: var(--font-vt323);
    line-height: 12px;
    padding: 8px;
`;

const Text = styled(Label)`
    font-size: 24px;
    line-height: 18px;
    margin-bottom: 8px;
`;

const Circle = styled.div`
    width: 16px;
    height: 16px;
    background-color: var(--yellow);
    border-radius: 24px;
`;

const Line = styled.div`
    width: 1px;
    border-right: 3px dashed var(--yellow);
    margin-right: 1px;
    flex-grow: 1;
`;

const GraphicContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 6px;
    padding-top: 36px;
`;

export default function Journey() {
    const terminal = useTerminal();

    if (!terminal.run) {
        return;
    }

    const address =  terminal.run.currentHop.address;

    return (
        <Container initial={{ y: '150%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1, ease: 'easeOut' }}>
            <GraphicContainer>
                <Circle />
                <Line />
                <Circle />
            </GraphicContainer>
            <TextContainer>
                <Label>You are now here:</Label>
                {address?.isInternalIP ? (
                    <Text>{LOCATION_NAME}</Text>
                ): (
                    <Text>
                        {address?.info?.location?.city || '???'}
                        {' '}
                        {address?.info?.location?.country.code && `(${address.info.location.country.code})`}
                    </Text>
                )}
                <Label>Your computer</Label>
            </TextContainer>
        </Container>
    );
}