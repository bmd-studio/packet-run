'use client'
import { styled } from 'styled-components';
import WelcomeScreen from "./welcome";
import Explanation from './explanation';
import useScreens from '@/components/useScreens';


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
    const { screen } = useScreens({
        screens,
        isInInputScreen: (index) => index == 8,
    });

    return (
        <ScreensWrapper>
            {screen}
        </ScreensWrapper>
    )
}
