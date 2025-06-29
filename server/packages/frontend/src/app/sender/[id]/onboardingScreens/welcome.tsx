'use client';

import { OnboardingScreen } from '@/components/OnBoardingScreen';
import { styled } from 'styled-components';
import { OnBoardingProps } from './types';

const WelcomeWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TextWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    h1, p {
    text-align: center;
    }
`
const Image = styled.img`
    height: 96px;
    display: inline-block;
    text-align: center;
`;
export default function WelcomeScreen(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <WelcomeWrapper>
                <TextWrapper>
                    <div>
                        <Image src="/packet-run-logo.svg" alt="Packet Run Logo" />
                        <h1><span className='with-accent-color'>START</span></h1>
                        <p>Gebruik de pijltjes op het toetsenbord [{`->`}] om verder te gaan.</p>
                    </div>
                </TextWrapper>
            </WelcomeWrapper>
        </OnboardingScreen >
    )

}
