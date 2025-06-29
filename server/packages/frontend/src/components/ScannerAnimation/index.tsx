import { SVGMotionProps, motion } from 'framer-motion';

interface ScannerAnimationProps {
  variant: 'empty' | 'scanning' | 'scanned';
  background: 'dark' | 'light';
  isServer?: boolean;
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
};

// Server rotation animation
const rotationVariants: SVGMotionProps<SVGSVGElement>['variants'] = {
    rotate: {
      rotate: [0, 0, -90, -90, 0],
      transition: {
        duration: 8, // Total: 2s rotate, 2s hold, 2s rotate, 2s hold
        times: [0, 0.25, 0.375, 0.625, 1], // Custom keyframe timing
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

export default function ScannerAnimation({
  variant,
  background,
  isServer,
}: ScannerAnimationProps) {
  return (
    <div style={{ position: 'relative', width: 360, height: 310 }}>
      {/* Main Scanner SVG */}
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
      {/* Rotating Server Handle (if isServer) */}
      {isServer && (
        <motion.svg
          width="113"
          height="362"
          viewBox="0 0 113 362"
          style={{
            position: 'absolute',
            top: -240,     // allow overflow above
            right: 0,   // position it on the right
            overflow: 'visible',
            pointerEvents: 'none',
            transformOrigin: '100% 100%',
          }}
          animate="rotate"
          variants={rotationVariants}
        >
          <path d="M0.111295 285L0.415596 77.0002L64 1.00084L64 361.001L0.111295 285Z" fill="#F96E12" />
          <path d="M112.415 77.1658L112.111 285.166L80.0001 361.001L80 1.00027L112.415 77.1658Z" fill="#FF8637" />
          <path d="M15.2631 181.023C15.2839 166.805 17.0781 154.015 19.9137 144.848C21.3352 140.252 22.9848 136.678 24.7211 134.299C26.4893 131.876 28.0736 131.041 29.3362 131.043C30.5988 131.045 32.1807 131.884 33.9418 134.312C35.6711 136.697 37.3103 140.275 38.7183 144.875C41.527 154.051 43.2839 166.846 43.2631 181.063C43.2423 195.281 41.448 208.071 38.6125 217.238C37.1909 221.834 35.5413 225.408 33.805 227.787C32.0369 230.21 30.4525 231.045 29.1899 231.043C27.9273 231.041 26.3454 230.202 24.5843 227.774C22.855 225.389 21.2159 221.811 19.8078 217.211C16.9991 208.035 15.2423 195.24 15.2631 181.023Z" fill="#FF781F" stroke="white" strokeWidth="4" />
          <rect x="64" y="1" width="16" height="360" fill="#FF781F" />
        </motion.svg>
      )}
    </div>
  );
}
