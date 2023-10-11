import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Background = styled(motion.svg)`
    background-color: black;
    height: 100%;
    width: 100%;
`;

const Meteor = styled(motion.img)`
    position: absolute;
    left: 0;
    top: 50%;
    width: 160px;
    height: auto;
    image-rendering: pixelated;
`;

export default function Stars() {
    const [size, setSize] = useState<DOMRect | null>(null);
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        setSize(ref.current?.getBoundingClientRect() || null);
    }, []);

    const rows = size ? Math.ceil(size.width / 100) : 0;
    const columns = size ? Math.ceil(size.height / 100) : 0;

    const stars: ReactNode[] = [];
    for (let i = 0; i < rows * columns; i++) {
        const duration = (Math.random() * 2 + 2);
        const translateX = Math.random() * (size?.width || 0);
        const translateY = Math.random() * (size?.height || 0);

        stars.push(
            <motion.g
                key={i}
                initial={{
                    scale: Math.random() / 3 + 0.5,
                    opacity: Math.random() / 5 + 0.2,
                    translateX,
                    translateY,
                }}
                animate={{
                    scale: Math.random() / 3 + 0.5,
                    opacity: Math.random() / 5 + 0.2,
                }}
                transition={{ repeat: Infinity, duration, repeatType: 'reverse'  }}
            >
                <path
                    d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                    fill="white"
                    stroke="#444"
                    strokeWidth={12}
                />
                <path
                    d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                    fill="white"
                    stroke="white"
                    strokeWidth={4}
                />
            </motion.g>
        );
    }

    return (
        <motion.div
            style={{ position: 'relative', overflow: 'hidden', gridArea: 'main' }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
        >
            <Background ref={ref}>
                {stars}
            </Background>
            <Meteor
                src="/asteroid.png" 
                initial={{ x: -200, rotate: -40 }}
                animate={{ x: 2200, rotate: 40 }}
                transition={{ duration: 20, delay: 5 }}
            />
        </motion.div>
    );
}