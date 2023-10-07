import { motion } from 'framer-motion';
import { CSSProperties, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Title } from '../Typography';

const Hint = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    gap: 64px;
`;

const Arrow = styled(motion.span)`
    font-size: 144px;
    display: inline-block;
`;

export type ArrowPlacement = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';

const mapPlacementToStyles: Record<ArrowPlacement, CSSProperties> = {
    'top-left': { top: 32, left: 32 },
    'bottom-left': { bottom: 32, left: 32 },
    'top-right': { top: 32, right: 32 },
    'bottom-right': { bottom: 32, right: 32 },
};

export default function ArrowWithLabel({ children, position }: PropsWithChildren<{ position: ArrowPlacement }>) {
    return (
        <Hint style={mapPlacementToStyles[position]}> 
            <Arrow
                initial={{ scaleX: 1.25 }}
                transition={{ repeat: Infinity, duration: 1 }}
                animate={{ x: [0, 48, 0], scaleX: 1.25 }}
            >
                <Title
                    stroke="var(--yellow)"
                    fontSize={120}
                    height={100}
                >
                    {position === 'top-left' || position === 'bottom-left' ? (
                        <>&lt;</>
                    ) : (
                        <>&gt;</>
                    )}
                </Title>
            </Arrow>
            {' '}
            <Title>{children}</Title>
        </Hint>
    )
}