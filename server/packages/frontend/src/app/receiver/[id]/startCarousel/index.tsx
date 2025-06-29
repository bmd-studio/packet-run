'use client'
import { styled } from 'styled-components';
import { useCallback, useEffect, useState } from "react"
import WelcomeScreen from "./welcome";
import Explanation from './explanation';


const ScreensWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0px;
    left:0px;
`

const screens: React.JSX.Element[] = [
    <WelcomeScreen key={'0'} currentStep={-1} stepAmount={-1} />,
    <Explanation key={'1'} currentStep={1} stepAmount={-1} />,
]

export default function OffBoardingFlow() {
    const [screenNumber, setScreenNumber] = useState(0);

    const incrementScreenNumber = useCallback(() => {
        setScreenNumber((previous) => {
            let newValue = previous + 1;
            if (newValue >= screens.length) {
                newValue = screens.length - 1;
                // should close
            }
            return newValue;
        });
    }, []);

    const decrementScreenNumber = useCallback(() => {
        setScreenNumber((previous) => {
            let newValue = previous - 1;
            if (newValue < 0) {
                newValue = 0;
            }
            return newValue;
        });
    }, []);

    const isInInputScreen = screenNumber == 8;

    useEffect(() => {
        // register key presses4
        document.onkeyup = (e) => {
            if (!isInInputScreen) {
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
            } else {
                switch (e.key) {
                    case 'Escape':
                        setScreenNumber(0);
                        break;
                }
            }
        }
    }, [
        setScreenNumber,
        isInInputScreen,
        incrementScreenNumber,
        decrementScreenNumber,
    ])

    const currentScreen = screens[screenNumber];
    return (
        <ScreensWrapper>
            {
                currentScreen
            }
        </ScreensWrapper>
    )
}
