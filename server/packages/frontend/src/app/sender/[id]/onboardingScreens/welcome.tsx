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
  h1, p {
    text-align: center;
  }
`

export default function WelcomeScreen(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <WelcomeWrapper>
                <TextWrapper>
                    <div>
                        <h1>Start <span className='with-accent-color'>PACKET RUN</span></h1>
                        <p>Gebruik de pijltjes op het toetsenbord [{`->`}] om verder te gaan.</p>
                    </div>
                </TextWrapper>
            </WelcomeWrapper>
        </OnboardingScreen >
    )

}
