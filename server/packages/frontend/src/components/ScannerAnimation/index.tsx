import { SVGMotionProps, motion } from 'framer-motion';
import { styled } from 'styled-components';
const AnimationWrapper = styled.div`
    height: 412px;
    width: 100%;
    position: relative;
`;
const LidWrapper = styled.div`
    width: 100%;
    overflow: visible;
    position:absolute;
    top: 88px;
    right: 0px;
    z-index: 4;
`;
const BaseWrapper = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 5;
`;
export type ScannerVariant = 'empty' | 'scanning' | 'scanned' | 'pressing';
interface ScannerAnimationProps {
    variant: ScannerVariant;
    background: 'dark' | 'light';
}

// Ball bounce animation
const ballVariants: SVGMotionProps<SVGGElement>['variants'] = {
    empty: {
        y: [-25, 25, -25],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
    scanned: {
        y: [25, 25, 25],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
    pressing: {
        y: [25, 25, 25],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    }
};

// Server rotation animation
const rotationVariants: SVGMotionProps<SVGSVGElement>['variants'] = {

    empty: {
        opacity: [0],
        transition: {
            duration: 0, // Total: 2s rotate, 2s hold, 2s rotate, 2s hold
        },
    },
    scanned: {
        opacity: [0],
        transition: {
            duration: 0,
        },
    },
    scanning: {
        opacity: [0],
        transition: {
            duration: 0,
        },
    },
    pressing: {
        rotate: [0, 0, 90, 90, 0],
        transition: {
            duration: 8, // Total: 2s rotate, 2s hold, 2s rotate, 2s hold
            times: [0, 0.25, 0.375, 0.625, 1], // Custom keyframe timing
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

function ballFillStyle(variant: ScannerVariant) {
    switch (variant) {
        case 'empty':
            return 'var(--light-gray-50)';
            break;
        case 'scanning':
        case 'scanned':
        case 'pressing':
            return 'var(--orange)';
            break;
    }
    return 'var(--light-gray-50)';
}

export default function ScannerAnimation({
    variant,
    background,
}: ScannerAnimationProps) {
    return (
        <AnimationWrapper>


            {/* Main Scanner SVG */}
            <BaseWrapper>
                <svg viewBox="0 0 360 310" width="360" height="310" style={{ display: 'block' }}>
                    {/* Static Scanner Top */}
                    <g transform="translate(0, 246)">
                        <path
                            d="M283.635 1L357.26 63H2.74023L76.3652 1H283.635Z"
                            fill="#FAEBD0"
                            stroke="#FAEBD0"
                            strokeWidth="2"
                        />
                        <path
                            d="M182 17C196.075 17 208.659 18.761 217.593 21.5098C222.084 22.8917 225.428 24.4554 227.561 26.0068C229.781 27.622 230 28.6839 230 29C230 29.3161 229.781 30.378 227.561 31.9932C225.428 33.5446 222.084 35.1083 217.593 36.4902C208.659 39.239 196.075 41 182 41C167.925 41 155.341 39.239 146.407 36.4902C141.916 35.1083 138.572 33.5446 136.439 31.9932C134.219 30.378 134 29.3161 134 29C134 28.6839 134.219 27.622 136.439 26.0068C138.572 24.4554 141.916 22.8917 146.407 21.5098C155.341 18.761 167.925 17 182 17Z"
                            fill="#FF781F"
                            stroke="#FF781F"
                            strokeWidth="8"
                        />
                    </g>
                    {/* Bouncing Ball & Dashed Line */}
                    <motion.g
                        variants={ballVariants}
                        animate={variant}
                        style={{
                            zIndex: 4,
                        }}
                    >
                        <circle
                            cx={180}
                            cy={180}
                            r={78}
                            stroke={background === 'light' ? 'black' : 'var(--white)'}
                            strokeWidth={4}
                            fill={ballFillStyle(variant)}
                        />
                        <path
                            d="M102 180 C132 210, 228 210, 258 180"
                            stroke={background === 'light' ? 'black' : 'var(--white)'}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="8 8"
                        />
                    </motion.g>
                </svg>
            </BaseWrapper>

            {/* Rotating Server Handle (if isServer) */}
            {variant === 'pressing' && (
                <LidWrapper>
                    <motion.svg
                        width="360"
                        height="160"
                        viewBox="0 0 360 160"
                        style={{
                            position: 'absolute',
                            right: 0,   // position it on the right
                            overflow: 'visible',
                            pointerEvents: 'none',
                            transformOrigin: 'right 88px',
                            zIndex: 3,
                        }}
                        animate="rotate"
                        variants={rotationVariants}
                    >
                        <rect width="360" height="16" transform="matrix(-1 0 0 -1 360 96)" fill="#FF8C41" />
                        <path d="M284 160L76 160L0 96L360 96L284 160Z" fill="#FF781F" />
                        <path d="M76 48H284L360 80H0L76 48Z" fill="#FF781F" />
                        <path d="M180 146C165.712 146 152.815 144.217 143.524 141.358C138.873 139.927 135.181 138.242 132.675 136.419C130.146 134.58 129 132.736 129 131C129 129.264 130.146 127.42 132.675 125.581C135.181 123.758 138.873 122.073 143.524 120.642C152.815 117.783 165.712 116 180 116C194.288 116 207.185 117.783 216.476 120.642C221.127 122.073 224.819 123.758 227.325 125.581C229.854 127.42 231 129.264 231 131C231 132.736 229.854 134.58 227.325 136.419C224.819 138.242 221.127 139.927 216.476 141.358C207.185 144.217 194.288 146 180 146Z" fill="#FF8C41" stroke="white" strokeWidth="2" />
                    </motion.svg>
                </LidWrapper>
            )}
        </AnimationWrapper>
    );
}
