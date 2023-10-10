import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: var(--dark-gray);
`;

const Bar = styled(motion.div)`
    background-color: var(--yellow);
    height: 16px;
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
    if (now < start.getTime() || now > end.getTime()) {
        return null;
    }

    // Calculate the reminaing duration and progress
    const remainingDuration = Math.max(end.getTime() - now, 0);
    const startProgression = (now - start.getTime()) / (end.getTime() - start.getTime());

    return (
        <Container>
            <Bar
                initial={{ width: `${startProgression * 100}%` }}
                animate={{ width: '100%' }}
                transition={{ duration: remainingDuration / 1_000 }}
            />
        </Container>
    );
}