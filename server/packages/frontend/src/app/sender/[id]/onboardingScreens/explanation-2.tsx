import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";


const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;

`

export default function Explanation2(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <p>
                    Elke dag gebruiken miljarden mensen het internet. Dat heeft een enorme invloed op de wereld. Maar hoe werkt dat eigenlijk?
                </p>
                <p>
                    Elke keer dat jij iets op internet doet, bijvoorbeeld een filmpje kijken of een website openen, stuur je een verzoek naar een server. Die server stuurt een antwoord terug.
                </p>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
