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

const ImageWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
`;
const Image = styled.img`
  width: 75%;
  box-sizing: border-box;
  padding-left: 72px;
`;

export default function Explanation3(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <TextWrapper>
                    <p>In Packet Run hebben we ook pakketjes en routers.</p>
                    <p>Routers in Packet Run zijn de houten stations</p>
                    <p>Pekketjes zijn de gekleurde balletjes</p>
                </TextWrapper>
                <ImageWrapper>
                    <Image src='/onboarding-terminal-and-bal-graphic.svg' alt="onboarding terminal and ball graphic" />
                </ImageWrapper>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
