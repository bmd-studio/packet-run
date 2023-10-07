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

interface ScannerAnimationProps {
    variant: 'empty' | 'scanning' | 'scanned';
}

const ringVariants: SVGMotionProps<SVGEllipseElement>['variants'] = {
    empty: {
        stroke: ['#000', '#F0EA00', '#000', '#000'],
    },
    scanning: {
        stroke: ['#000']
    },
    scanned: {
        stroke: ['#000']
    },
};

const ballVariants: SVGMotionProps<SVGEllipseElement>['variants'] = {
    empty: {
        y: [-25, 25, -25],
    },
    scanning: {
        y: [-5, 5, -5],
    },
    scanned: {
        y: [-5, 5, -5],
    },
};

export default function ScannerAnimation({ variant }: ScannerAnimationProps) {
    return (
        <svg viewBox="0 0 500 435" width="500" height="435">
            <motion.g>
                <Ring
                    cx="250"
                    cy="410"
                    rx="25"
                    ry="6.25"
                    initial={{ stroke: '#000' }}
                    variants={ringVariants}
                    animate={variant}
                    transition={{ ...ringTransition, delay: 0 }}
                />
                <Ring
                    cx="250"
                    cy="390"
                    rx="100"
                    ry="25"
                    animate={variant}
                    variants={ringVariants}
                    transition={{ ...ringTransition, delay: 0.5 }}
                />
                <Ring
                    cx="250"
                    cy="365"
                    rx="175"
                    ry="43.75"
                    initial={{ stroke: '#000' }}
                    animate={variant}
                    variants={ringVariants}
                    transition={{ ...ringTransition, delay: 1 }}
                />
                <Ring
                    cx="250"
                    cy="330"
                    rx="200"
                    ry="50"
                    initial={{ stroke: '#000' }}
                    animate={variant}
                    variants={ringVariants}
                    transition={{ ...ringTransition, delay: 1.5 }}
                />
            </motion.g>
            <motion.g 
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                variants={ballVariants}
                animate={variant}
            >
                <ellipse
                    stroke={variant === 'scanned' ? 'var(--yellow)' : 'black'}
                    strokeWidth={8}
                    fill={variant === 'scanned' ? 'black' : 'var(--light-gray)'}
                    strokeDasharray={variant === 'empty' ? "36 20" : "none"}
                    rx={150}
                    ry={150}
                    cx={250}
                    cy={180} 
                />
                <path
                    d="M100 182C163 222.5 332.5 225 400 182"
                    stroke={variant === 'scanned' ? 'var(--yellow)' : 'black'}
                    fill="none"
                    strokeWidth="8"
                    strokeDasharray="36 20"
                />
            </motion.g>
        </svg>
    )
}