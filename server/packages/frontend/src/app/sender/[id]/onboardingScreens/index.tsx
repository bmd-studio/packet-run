'use client'

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
import Explanation8 from "./explanation-8";
import useScreens from '@/components/useScreens';

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
    runId: string | undefined;
}
export default function OnBoardingFlow(props: OnBoardingFlowProps) {
    const { resetCallback, ballPresent, ballPressed, runId } = props;

    const { screen } = useScreens({
        screens({ increment, setIndex }) {
            return [
                <WelcomeScreen key={'0'} currentStep={-1} stepAmount={-1} />,
                <Explanation1 key={'1'} currentStep={0} stepAmount={8} />,
                <Explanation2 key={'2'} currentStep={1} stepAmount={8} />,
                <Explanation3 key={'3'} currentStep={2} stepAmount={8} />,
                <Explanation4 key={'4'} currentStep={3} stepAmount={8} />,
                <Explanation5 key={'5'} currentStep={4} stepAmount={8} />,
                <Explanation6 key={'6'} currentStep={5} stepAmount={8} />,
                <Explanation7 key={'7'} currentStep={6} stepAmount={8} />,
                <Explanation8 key={'8'} currentStep={7} stepAmount={8} />,
                <WebsiteInput
                    key="9"
                    currentStep={8}
                    stepAmount={-1}
                    setHost={
                        (host: string) => {
                            props.setHost(host);
                            increment();
                        }}
                />,
                <SendInstructions
                    key="9"
                    currentStep={8}
                    stepAmount={-1}
                    ballPressed={ballPressed}
                    ballPresent={ballPresent}
                    runId={runId}
                    resetCallback={() => {
                        resetCallback();
                        setIndex(0);
                    }}
                />,
            ]
        },
        isInInputScreen: (index) => index == 9,
    });

    return (
        <ScreensWrapper>
            {screen}
        </ScreensWrapper>
    )
}
