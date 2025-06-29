
'use client'
import { styled } from 'styled-components';
import WebpageView from './webpageView';
import MapView from './map';
import End from './end';
import useScreens from '@/components/useScreens';


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
export default function EndCarousel() {
    const { screen } = useScreens({
        screens: [
            <WebpageView key={'1'} currentStep={-1} stepAmount={-1} />,
            <MapView key={'2'} currentStep={1} stepAmount={-1} />,
            <End key={'3'} currentStep={2} stepAmount={-1} />,
        ],
    });

    return (
        <ScreensWrapper>
            {screen}
        </ScreensWrapper>
    )
}
