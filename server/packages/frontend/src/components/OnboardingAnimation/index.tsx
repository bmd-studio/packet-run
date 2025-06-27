import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

const AnimationWrapper = styled.div`
  height: 412px;
  width: 100%;
  position: relative;
`;

const BaseWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
`;

const LidWrapper = styled.div`
  width: 100%;
  overflow: visible;
  position: absolute;
  top: 88px;
  right: 0;
  z-index: 4;
`;

const TopHalf = ({ stroke }: { stroke: string }) => (
  <path
    d="M82 2C126.183 2 162 37.8172 162 82C162 83.0491 161.979 84.0935 161.939 85.1328C139.242 95.1515 111.912 101 82.5 101C52.6479 101 24.9405 94.9755 2.04492 84.6807C2.01562 83.7907 2 82.8971 2 82C2 37.8172 37.8172 2 82 2Z"
    fill="#D9D9D9"
    stroke={stroke}
    strokeWidth="4"
  />
);

const BottomHalf = ({ stroke }: { stroke: string }) => (
  <>
    <path
      d="M3 11.9957C25.8954 22.2902 53.6025 28.314 83.4541 28.314C112.866 28.314 140.196 22.4655 162.894 12.4469C161.248 55.1776 126.088 89.3141 82.9541 89.3141C39.6688 89.3141 4.41437 54.937 3 11.9957Z"
      fill="#D9D9D9"
      stroke={stroke}
      strokeWidth="4"
    />
    <path
      d="M3 11.9957C25.8954 22.2902 53.6025 28.314 83.4541 28.314C112.866 28.314 140.196 22.4655 162.894 12.4469M3 11.9957C4.41437 54.937 39.6688 89.3141 82.9541 89.3141C126.088 89.3141 161.248 55.1776 162.894 12.4469M3 11.9957C57.5 -1.50034 117 0.5 162.894 12.4469"
      fill="#D9D9D9"
      stroke={stroke}
      strokeWidth="4"
    />
  </>
);

export default function BallAnimation({ background = 'light', allStepsDone = false }: { background?: 'light' | 'dark'; allStepsDone?: boolean }) {
    const generatedCodeColor = "black";
    const strokeColor = background === 'light' ? 'black' : 'white';
    const topControls = useAnimation();
    const bottomControls = useAnimation();
    const handleControls = useAnimation();
    const [randomText, setRandomText] = useState<string | null>(null);
  
    useEffect(() => {
      let interval: NodeJS.Timeout;
  
      const animate = async () => {
        setRandomText(null);
        await topControls.set({ opacity: 1, y: -206 });
        await bottomControls.set({ opacity: 1, y: -132 });
  
        await Promise.all([
          topControls.start({ opacity: 1, y: -8, transition: { duration: 1.2 } }),
          bottomControls.start({ opacity: 1, y: 64, transition: { duration: 1.2 } }),
        ]);
  
        await new Promise((res) => setTimeout(res, 1000));
  
        await topControls.start({ y: -100, transition: { duration: 1.2 } });
  
        await new Promise((res) => setTimeout(res, 1000));
  
        const start = Date.now();
        interval = setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed >= 2000) {
          clearInterval(interval);
          setRandomText(null);
          topControls.start({ y: -8, transition: { duration: 1.2 } }).then(() => {
            handleControls.start({
              rotate: [90, 0, 0, 90],
              transition: {
                duration: 3,
                times: [0, 0.3, 0.6, 1],
                ease: 'easeInOut',
              },
            }).then(() => {
                if (!allStepsDone) {
                  setTimeout(() => {
                    animate();
                  }, 1000);
                }
              });
            });
          } else {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=';
            let result = 'www.';
            for (let i = 0; i < 5; i++) {
              result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            setRandomText(result);
          }
        }, 100);
      };
  
      animate();
  
      return () => clearInterval(interval);
    }, [allStepsDone]);
  
    return (
      <AnimationWrapper>
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
  
            {/* Animated Ball Halves */}
            <motion.g animate={bottomControls}>
                <g transform="translate(98, 120)">
                    < BottomHalf 
                        stroke={strokeColor} 
                        z-index="2"
                    />
                </g>
            </motion.g>
            <motion.g animate={topControls}>
                <g transform="translate(99, 120)">
                    < TopHalf 
                    stroke={strokeColor} 
                    z-index="10"
                    />
                </g>
            </motion.g>
            {/* Flickering Number */}
            {randomText && (
                <text
                    x="180"
                    y="160"
                    textAnchor="middle"
                    fontSize="18"
                    fontFamily="Doto"
                    fill={generatedCodeColor}                >
                    {randomText}
                </text>
                )}
          </svg>
        </BaseWrapper>
        {/* Rotating Handle Animation */}
        <LidWrapper>
            <motion.svg
            width="360"
            height="160"
            viewBox="0 0 360 160"
            style={{
                position: 'absolute',
                rotate: 90,
                right: 0,
                overflow: 'visible',
                pointerEvents: 'none',
                transformOrigin: 'right 88px',
                zIndex: 3,
            }}
            animate={handleControls}
            >
            <rect width="360" height="16" transform="matrix(-1 0 0 -1 360 96)" fill="#FF8C41" />
            <path d="M284 160L76 160L0 96L360 96L284 160Z" fill="#FF781F" />
            <path d="M76 48H284L360 80H0L76 48Z" fill="#FF781F" />
            <path d="M180 146C165.712 146 152.815 144.217 143.524 141.358C138.873 139.927 135.181 138.242 132.675 136.419C130.146 134.58 129 132.736 129 131C129 129.264 130.146 127.42 132.675 125.581C135.181 123.758 138.873 122.073 143.524 120.642C152.815 117.783 165.712 116 180 116C194.288 116 207.185 117.783 216.476 120.642C221.127 122.073 224.819 123.758 227.325 125.581C229.854 127.42 231 129.264 231 131C231 132.736 229.854 134.58 227.325 136.419C224.819 138.242 221.127 139.927 216.476 141.358C207.185 144.217 194.288 146 180 146Z" fill="#FF8C41" stroke="white" strokeWidth="2" />
            </motion.svg>
        </LidWrapper>
      </AnimationWrapper>
    );
  }
  