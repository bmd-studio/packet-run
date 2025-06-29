import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';


const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;

`

export function Explanation7(props: OnBoardingProps) {
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
