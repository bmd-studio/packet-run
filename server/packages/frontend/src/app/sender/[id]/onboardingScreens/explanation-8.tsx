import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";


const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;

`

export default function Explanation8(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <p>
                    Heb je er al zin in?
                </p>
                <p>
                    We gaan nu een pakketje maken voor een website naar keuze, zodat je kunt starten met Packet Run!
                </p>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
