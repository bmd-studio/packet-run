import { SVGMotionProps, motion } from 'framer-motion';
import { styled } from 'styled-components'

interface ScannerAnimationProps {
    variant: 'empty' | 'scanning' | 'scanned';
    background: 'dark' | 'light';
    isServer?: boolean;
}

// Animation for bumping ball
const ballVariants: SVGMotionProps<SVGEllipseElement>['variants'] = {
    empty: {
        y: [-25, 25, -25],
    }
};

// Animation for rotating server handle
const rotationVariants: SVGMotionProps<SVGGElement>['variants'] = {
    rotate: {
      rotate: [-10, 10, -10],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

export default function ScannerAnimation({ variant, background, isServer }: ScannerAnimationProps) {
    return (
        <svg viewBox="0 0 360 310" width="360" height="310" style={{ display: 'block' }}>
            {/* Static Scanner Top (positioned 42px from bottom) */}
            <g id="scanner-top" transform="translate(0, 246)">
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
            {/* Rotating Server Indicator */}
        {isServer && (
            <motion.g
            variants={rotationVariants}
            animate="rotate"
            transform="translate(362, 224)"
            >
            <rect
                width="360"
                height="16"
                transform="rotate(-89.9162)"
                fill="#FF781F"
            />
            <path
                d="M0.111187 284L0.415487 76.0003L64.5266 0.0940172L63.9999 360.094L0.111187 284Z"
                fill="#F96E12"
            />
            <path
                d="M112.415 76.164L112.111 284.164L79.9997 360.117L80.5264 0.117247L112.415 76.164Z"
                fill="#FF8637"
            />
            <path
                d="M15.2631 180.022C15.2839 165.805 17.0781 153.014 19.9137 143.847C21.3352 139.251 22.9848 135.677 24.7211 133.298C26.4893 130.875 28.0736 130.04 29.3362 130.042C30.5988 130.044 32.1807 130.883 33.9418 133.312C35.6711 135.696 37.3103 139.274 38.7183 143.874C41.527 153.05 43.2839 165.845 43.2631 180.062C43.2423 194.28 41.448 207.07 38.6125 216.237C37.1909 220.833 35.5413 224.407 33.805 226.786C32.0369 229.209 30.4525 230.044 29.1899 230.042C27.9273 230.04 26.3454 229.201 24.5843 226.773C22.855 224.388 21.2159 220.81 19.8078 216.21C16.9991 207.034 15.2423 194.239 15.2631 180.022Z"
                fill="#FF781F"
                stroke="white"
                strokeWidth="4"
            />
            </motion.g>
      )}
        </svg>
    )
}

