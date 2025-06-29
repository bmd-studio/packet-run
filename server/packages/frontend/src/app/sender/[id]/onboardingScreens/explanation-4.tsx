import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";


const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;
    display: flex;
    flex-direction: row;
    gap:32px;
    height: 100%;
`

const TextWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  & p {
    margin-bottom: 60px;
  }
`;
const LineWrapper = styled.div`
    width: 45.9vw;
    display: flex;
    flex-direction: row;
    gap: 30px;
    & p {
        display: flex;
    }
`
const ArrowWrapper = styled.div`
    height: 100%;
    display:flex;
    flex-direction:column;
    justify-content: center;
    width: 80px;
    text-align: center;
    font-size: 40px;
`;
const ImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
  flex-grow: 1;
  height: 100%;
`;
const Image = styled.img`
  width: 80%;
  box-sizing: border-box;
  padding-left: 72px;
  marign-right: -20px;
`;

export default function Explanation4(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <TextWrapper>
                    <LineWrapper>
                        <p>In Packet Run hebben we ook pakketjes en routers.</p>
                        <ArrowWrapper />
                    </LineWrapper>
                    <LineWrapper>
                        <p>Routers in Packet Run zijn de houten stations.</p>
                        <ArrowWrapper>
                            <div>
                                {`->`}
                            </div>
                        </ArrowWrapper>
                    </LineWrapper>
                    <LineWrapper>
                        <p>Pakketjes zijn de gekleurde balletjes.</p>
                        <ArrowWrapper>
                            <div>
                                {`->`}
                            </div>
                        </ArrowWrapper>
                    </LineWrapper>
                </TextWrapper>
                <ImageWrapper>
                    <Image src='/onboarding-terminal-and-bal-graphic.svg' alt="onboarding terminal and ball graphic" />
                </ImageWrapper>
            </ContentWrapper>
        </OnboardingScreen >
    )

}
