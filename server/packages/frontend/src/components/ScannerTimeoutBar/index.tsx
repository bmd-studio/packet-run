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
    if (!start || !end) {
        return null;
    }

    const now = new Date().getTime();
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