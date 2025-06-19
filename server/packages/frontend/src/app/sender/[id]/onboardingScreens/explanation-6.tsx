import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";

const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;

`

export default function Explanation6(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <p>
                    Aan het eind van je reis komt je pakketje aan bij de achterzijde van deze PC.
                </p>
                <p>
                    Hier kun je je website bekijken en je afgelegde route zien. Gaaf he!
                </p>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
