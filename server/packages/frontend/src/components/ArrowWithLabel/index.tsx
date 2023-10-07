import { motion } from 'framer-motion';
import { CSSProperties, PropsWithChildren, useMemo } from 'react';
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
    'top-left': { top: 64, left: 64 },
    'bottom-left': { bottom: 64, left: 64 },
    'top-right': { top: 64, right: 64, flexDirection: 'row-reverse' },
    'bottom-right': { bottom: 64, right: 64, flexDirection: 'row-reverse' },
};

export default function ArrowWithLabel({ children, position }: PropsWithChildren<{ position: ArrowPlacement }>) {
    const isLeft = useMemo(() => position === 'top-left' || position === 'bottom-left', [position]);

    return (
        <Hint style={mapPlacementToStyles[position]}> 
            <Arrow
                initial={{ scaleX: 1.25 }}
                transition={{ repeat: Infinity, duration: 1 }}
                animate={{ x: isLeft ? [0, 48, 0] : [0, -48, 0], scaleX: 1.25 }}
            >
                <Title
                    stroke="var(--yellow)"
                    fontSize={120}
                    height={100}
                >
                    {isLeft ? (
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