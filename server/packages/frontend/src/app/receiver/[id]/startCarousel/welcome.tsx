'use client';

import { OnboardingScreen } from '@/components/OnBoardingScreen';
import { styled } from 'styled-components';
import { OffboardingScreenProps } from '../types';

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
  h1 {
    font-size: 128px;
    line-height: normal;
  }
  p {
      font-size: 40px;
  }
`


export default function WelcomeScreen(props: OffboardingScreenProps) {
    return (
        <OnboardingScreen indicator={{ ...props }}>
            <WelcomeWrapper>
                <TextWrapper>
                    <div>
                        <h1>Website Bekijken </h1>
                        <p>Gebruik de pijltjes op het toetsenbord [{`->`}] om verder te gaan.</p>
                    </div>
                </TextWrapper>
            </WelcomeWrapper>
        </OnboardingScreen >
    )

}
