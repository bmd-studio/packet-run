'use client'

import { useEffect, useState } from "react"
import WelcomeScreen from "./welcome";
import { styled } from "styled-components";
import { Explanation1 } from "./explanation-1";


const ScreensWrapper = styled.div`
width: 100vw;
height: 100vh;
position: fixed;
top:0px;
left:0px;

`
export default function OnBoardingFlow() {
    const [screenNumber, setScreenNumber] = useState(0);
    const screens = [
        <WelcomeScreen key={'0'} />,
        <Explanation1 key={'1'} currentStep={0} stepAmount={2} />,
    ]

    const incrementScreenNumber = () => {
        setScreenNumber((previous) => {
            let newValue = previous + 1;
            if (newValue >= screens.length) {
                newValue = screens.length - 1;
            }
            return newValue;
        });
    }

    const decrementScreenNumber = () => {
        setScreenNumber((previous) => {
            let newValue = previous - 1;
            if (newValue < 0) {
                newValue = 0;
            }
            return newValue;
        });
    }
    useEffect(() => {
    // register key presses
        console.log('registering key press');
        document.onkeyup = (e) => {
            console.log(e.key);
            switch (e.key) {
                case 'ArrowRight':
                    incrementScreenNumber();
                    break;
                case 'ArrowLeft':
                    decrementScreenNumber();
                    break;
                case 'Escape':
                    setScreenNumber(0);
                    break;
            }
        }
    }, [])

    const currentScreen = screens[screenNumber];
    console.log('loaded');
    return (
        <ScreensWrapper>
            {
                currentScreen
            }
        </ScreensWrapper>
    )
}
