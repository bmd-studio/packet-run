
'use client'
import { styled } from 'styled-components';
import { useCallback, useEffect, useState } from "react"
import WebpageView from './webpageView';
import MapView from './map';
import End from './end';


const ScreensWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0px;
    left:0px;
`

export interface EndCarouselProps {
    resetCallback: () => void;
}
export default function EndCarousel(props: EndCarouselProps) {
    const { resetCallback } = props;
    let screens: React.JSX.Element[] = [];
    const [screenNumber, setScreenNumber] = useState(0);

    const incrementScreenNumber = useCallback(() => {
        setScreenNumber((previous) => {
            let newValue = previous + 1;
            if (newValue >= screens.length) {
                newValue = screens.length - 1;
                // should close
                resetCallback();
            }
            return newValue;
        });
    }, [screens.length, resetCallback]);

    const decrementScreenNumber = useCallback(() => {
        setScreenNumber((previous) => {
            let newValue = previous - 1;
            if (newValue < 0) {
                newValue = 0;
            }
            return newValue;
        });
    }, []);

    screens = [
        <WebpageView key={'1'} currentStep={-1} stepAmount={-1} />,
        <MapView key={'2'} currentStep={1} stepAmount={-1} />,
        <End key={'3'} currentStep={2} stepAmount={-1} />,
    ]

    useEffect(() => {
        // register key presses4
        document.onkeyup = (e) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'd':
                case 'Enter':
                    incrementScreenNumber();
                    break;
                case 'ArrowLeft':
                case 'a':
                    decrementScreenNumber();
                    break;
                case 'Escape':
                    setScreenNumber(0);
                    break;
            }
        }
    }, [setScreenNumber, screens.length, incrementScreenNumber, decrementScreenNumber]);

    const currentScreen = screens[screenNumber];
    return (
        <ScreensWrapper>
            {
                currentScreen
            }
        </ScreensWrapper>
    )
}
