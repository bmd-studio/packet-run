'use client'

import { useCallback, useEffect, useState } from "react"
import WelcomeScreen from "./welcome";
import { styled } from "styled-components";
import Explanation1 from "./explanation-1";
import Explanation2 from "./explanation-2";
import Explanation3 from "./explanation-3";
import Explanation4 from "./explanation-4";
import Explanation5 from "./explanation-5";
import Explanation6 from "./explanation-6";
import Explanation7 from "./explanation-7";
import WebsiteInput from "./website-input";
import SendInstructions from "./send-instructions";
import { setConfig } from "next/config";


const ScreensWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0px;
    left:0px;
`

export interface OnBoardingFlowProps {
    setHost: (host: string) => void;
    ballPresent: boolean;
    ballPressed: boolean;
    resetCallback: () => void;
}
export default function OnBoardingFlow(props: OnBoardingFlowProps) {
    let { ballPresent } = props;
    let screens = [];
    const { ballPressed, resetCallback } = props;
    if (ballPressed) {
        ballPresent = true;
    }
    const [screenNumber, setScreenNumber] = useState(0);

    const incrementScreenNumber = useCallback(() => {
        setScreenNumber((previous) => {
            let newValue = previous + 1;
            if (newValue >= screens.length) {
                newValue = screens.length - 1;
            }
            return newValue;
        });
    }, [screens.length]);

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
        <WelcomeScreen key={'0'} currentStep={-1} stepAmount={-1} />,
        <Explanation1 key={'1'} currentStep={0} stepAmount={7} />,
        <Explanation2 key={'2'} currentStep={1} stepAmount={7} />,
        <Explanation3 key={'3'} currentStep={2} stepAmount={7} />,
        <Explanation4 key={'4'} currentStep={3} stepAmount={7} />,
        <Explanation5 key={'5'} currentStep={4} stepAmount={7} />,
        <Explanation6 key={'6'} currentStep={5} stepAmount={7} />,
        <Explanation7 key={'7'} currentStep={6} stepAmount={7} />,
        <WebsiteInput key="8" currentStep={7} stepAmount={-1} setHost={
            (host: string) => {
                props.setHost(host);
                incrementScreenNumber();
            }}
        />,
        < SendInstructions
            key="9"
            currentStep={8}
            stepAmount={- 1
            }
            ballPressed={ballPressed}
            ballPresent={ballPresent}
            resetCallback={resetCallback}
        />,
    ]
    const isInInputScreen = screenNumber == 8;

    useEffect(() => {
        // register key presses
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
                //switch (e.key) {
                //    case 'Enter':
                //    case 'ArrowRight': // FIXME: remove after testing
                //        incrementScreenNumber();
                //        break;
                //    case 'Escape':
                //    case 'ArrowLeft': // FIXME: remove after testing
                //        decrementScreenNumber();
                //        break;
                //}
            }
        }
    }, [setScreenNumber, screens.length, isInInputScreen])

    const currentScreen = screens[screenNumber];
    return (
        <ScreensWrapper>
            {
                currentScreen
            }
        </ScreensWrapper>
    )
}
