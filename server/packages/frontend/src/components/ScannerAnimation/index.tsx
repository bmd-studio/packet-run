import { SVGMotionProps, motion } from 'framer-motion';
import { styled } from 'styled-components'

const Ring = styled(motion.ellipse)`
    stroke-width: 8px;
    fill: none;
`;

type RingProps = SVGMotionProps<SVGEllipseElement>;

const ringTransition: RingProps['transition'] = {
    duration: 2,
    repeat: Infinity,
    ease: [(val) => val > 0.5 ? 1 : 0, 'easeInOut', 'easeInOut'],
};

const ringAnimate: RingProps['animate'] = {
    stroke: ['#000', '#F0EA00', '#000', '#000'],
};

interface ScannerAnimationProps {
    variant: 'empty' | 'scanning' | 'scanned';
}

export default function ScannerAnimation({ variant }: ScannerAnimationProps) {
    return (
        <svg viewBox="0 0 500 500" width="500" height="500">
            <motion.g>
                <Ring
                    cx="250"
                    cy="480"
                    rx="25"
                    ry="6.25"
                    initial={{ stroke: '#000' }}
                    animate={variant === 'empty' ? ringAnimate : {}}
                    transition={{ ...ringTransition, delay: 0 }}
                />
                <Ring
                    cx="250"
                    cy="460"
                    rx="100"
                    ry="25"
                    initial={{ stroke: '#000' }}
                    animate={variant === 'empty' ? ringAnimate : {}}
                    transition={{ ...ringTransition, delay: 0.5 }}
                />
                <Ring
                    cx="250"
                    cy="435"
                    rx="175"
                    ry="43.75"
                    initial={{ stroke: '#000' }}
                    animate={variant === 'empty' ? ringAnimate : {}}
                    transition={{ ...ringTransition, delay: 1 }}
                />
                <Ring
                    cx="250"
                    cy="400"
                    rx="200"
                    ry="50"
                    initial={{ stroke: '#000' }}
                    animate={variant === 'empty' ? ringAnimate : {}}
                    transition={{ ...ringTransition, delay: 1.5 }}
                />
            </motion.g>
            <motion.g 
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                animate={variant === 'empty' ? { y: [-25, 25, -25] } : {}}
            >
                <ellipse
                    stroke={variant === 'scanned' ? 'var(--yellow)' : 'black'}
                    strokeWidth={8}
                    fill={variant === 'scanned' ? 'black' : 'var(--light-gray)'}
                    strokeDasharray={variant === 'empty' ? "36 20" : "none"}
                    rx={150}
                    ry={150}
                    cx={250}
                    cy={250} 
                />
                <path
                    d="M100 252C163 292.5 332.5 295 400 252"
                    stroke={variant === 'scanned' ? 'var(--yellow)' : 'black'}
                    fill="none"
                    strokeWidth="8"
                    strokeDasharray="36 20"
                />
            </motion.g>
        </svg>
    )
}