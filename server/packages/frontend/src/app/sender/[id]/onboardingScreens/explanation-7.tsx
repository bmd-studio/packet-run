import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";

const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;

`

export default function Explanation7(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <p>
                    De computer waar je nu achter zit, gebruik je om een pakketje te versturen naar een bepaalde website. Aan het eind van de reis komt dat pakketje aan bij de achterkant van deze computer.
                </p>
                <p>
                    Daar kun je de website bekijken én de route zien die je pakketje heeft afgelegd. Gaaf, hè?
                </p>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
