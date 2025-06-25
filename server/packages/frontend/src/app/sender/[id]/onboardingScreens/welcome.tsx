'use client';

import PatternedBackground from '@/components/PatternedBackground';
import { styled } from 'styled-components';

const WelcomeWrapper = styled(PatternedBackground)`
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

export default function WelcomeScreen() {
    return (
        <WelcomeWrapper>
            <TextWrapper>
                <div>
                    <h1>WELKOM BIJ <span className='with-accent-color'>PACKET RUN</span></h1>
                    <p>Gebruik de pijltjes op het toetsenbord {'[->]'} om verder te gaan.</p>
                </div>
            </TextWrapper>
        </WelcomeWrapper>
    )

}
