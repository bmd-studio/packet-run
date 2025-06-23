import { SVGMotionProps, motion } from 'framer-motion';
import { styled } from 'styled-components'

interface ScannerAnimationProps {
    variant: 'empty' | 'scanning' | 'scanned';
    background: 'dark' | 'light';
}

const ballVariants: SVGMotionProps<SVGEllipseElement>['variants'] = {
    empty: {
        y: [-25, 25, -25],
    }
};

export default function ScannerAnimation({ variant, background }: ScannerAnimationProps) {
    return (
        <svg viewBox="0 0 360 310" width="360" height="310">
            {/* Static Scanner Top (positioned 42px from bottom) */}
            <g id="scanner-top" transform="translate(0, 254)">
                <path
                d="M283.635 1L357.26 63H2.74023L76.3652 1H283.635Z"
                fill="#FAEBD0"
                stroke="#FF781F"
                strokeWidth="2"
                />
                <path
                d="M182 17C196.075 17 208.659 18.761 217.593 21.5098C222.084 22.8917 225.428 24.4554 227.561 26.0068C229.781 27.622 230 28.6839 230 29C230 29.3161 229.781 30.378 227.561 31.9932C225.428 33.5446 222.084 35.1083 217.593 36.4902C208.659 39.239 196.075 41 182 41C167.925 41 155.341 39.239 146.407 36.4902C141.916 35.1083 138.572 33.5446 136.439 31.9932C134.219 30.378 134 29.3161 134 29C134 28.6839 134.219 27.622 136.439 26.0068C138.572 24.4554 141.916 22.8917 146.407 21.5098C155.341 18.761 167.925 17 182 17Z"
                fill="#FF781F"
                stroke="#FF781F"
                strokeWidth="8"
                />
            </g>
            <motion.g 
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                variants={ballVariants}
                animate={variant}
            >
                <circle
                    cx={180}
                    cy={180}
                    r={78}
                    stroke={background === 'light' ? 'black' : 'var(--white)'}
                    strokeWidth={4}
                    fill={variant === 'scanned' ? 'var(--orange)' : 'var(--light-gray-50)'}
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
    )
}

