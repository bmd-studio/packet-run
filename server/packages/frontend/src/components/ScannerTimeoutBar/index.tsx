import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContainerContainer = styled.div`
    position: fixed;
    right: 0px;
    bottom: 0px;
    left: 0px;

`;
const Container = styled(motion.div)`
    z-index: 100;
    background-color: var(--dark-gray);
`;

const Bar = styled(motion.div)`
    background-color: var(--orange);
    height: 38px;
`;

/**
 * A helper component that shows an animated loading bar that animates between a
 * start and an end date
 */
export default function ScannerTimeoutBar({ start, end }: { start?: Date, end?: Date }) {
    // GUARD: Don't display the bar if one of the dates is missing
    if (!start || !end) {
        return null;
    }

    // Fetch the current time
    const now = new Date().getTime();

    // GUARD: Only render the bar if we're within the duration zone
    if (now > end.getTime()) {
        return null;
    }

    // Calculate the reminaing duration and progress
    const delay = Math.max(start.getTime() - now, 0) / 1_000;
    const duration = Math.max(end.getTime() - now, 0) / 1_000;
    const startProgression = Math.max((now - start.getTime()) / (end.getTime() - start.getTime()), 0);

    return (
        <ContainerContainer>
            <Container
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Bar
                    initial={{ width: `${startProgression * 100}%` }}
                    animate={{ width: '100%' }}
                    transition={{ duration, delay }}
                />
            </Container>
        </ContainerContainer>
    );
}
