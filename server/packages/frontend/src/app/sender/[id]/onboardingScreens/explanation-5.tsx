import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";


const ContentWrapper = styled.div`
    padding-left: 200px;
    padding-right: 140px;
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
  width: 66%;
`;

const ImageWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
`;
const Image = styled.img`
  width: 91%;
`;
const OrderedList = styled.ol`
  list-style: decimal;
  font-size: 40px;
  box-sizing: border-box;
  padding-left: 72px;
`;
const TopText = styled.p`
margin-bottom: 60px;
`

export default function Explanation5(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <TextWrapper>
                    <TopText>
                        Hoe gebruik je de bal en router?
                    </TopText>
                    <OrderedList>
                        <li>Je bal komt in het bakje aangerold</li>
                        <li>Plaats de bal op de scanner</li>
                        <li>Lees de informatie op het scherm</li>
                        <li>Gooi bal door één van de gaten</li>
                        <li>Volg waar je bal naartoe gaat</li>
                    </OrderedList>
                </TextWrapper>
                <ImageWrapper>
                    <Image src='/onboarding-terminal-graphic.svg' alt="onboarding terminal" />
                </ImageWrapper>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
