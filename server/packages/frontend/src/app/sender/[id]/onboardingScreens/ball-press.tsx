
import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";


const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;

`

export default function BallPressScreen(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <p>
                    Volg deze instructies:
                </p>

                <p>
                    Laten we kort uitleggen wat je gaat doen met Packet Run. Je kan de pijltjes op het toetsenbord gebruiken om door te klikken in de uitleg.
                </p>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
