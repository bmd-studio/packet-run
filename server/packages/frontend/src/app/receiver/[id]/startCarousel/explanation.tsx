import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OffboardingScreenProps } from "../types";


const ContentWrapper = styled.div`
    padding-left: 11.25vw;
    width: 100%;

`
const TextWrapper = styled.div`
    width: 58vw;
    height: 100%;
    flex-direction: column;
    & p {
        font-size: 40px;
    }
`;

// TODO: add the packet scanner
export default function Explanation(props: OffboardingScreenProps) {
    return (
        <OnboardingScreen indicator={{ ...props }}>
            <ContentWrapper>
                <TextWrapper>
                    <p>
                        Welkom terug bij de thuis computer!
                    </p>
                    <p>
                        Komt dit pakketje terug van de server, leg deze dan op de scanner om het pakketje uit te pakken, en die informatie te gebruiken om de website te laden.
                    </p>
                    <p>
                        We hebben ook nog een overzicht van de reis die je pakketje met Packet Run heeft gemaakt.
                    </p>
                </TextWrapper>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
