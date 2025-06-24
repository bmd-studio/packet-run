import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";


const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;

`

export default function Explanation3(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <p>
                    Die verzoeken en antwoorden worden opgedeeld in kleine pakketjes. Die pakketjes reizen over de hele wereld, via kabels en routers. Routers zijn apparaten die helpen om pakketjes de juiste kant op te sturen.
                </p>
                <p>
                    Al die kabels en routers vormen samen één groot netwerk. Er is niet één baas van het internet — het wordt beheerd door honderdduizenden bedrijven en organisaties over de hele wereld.
                </p>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
