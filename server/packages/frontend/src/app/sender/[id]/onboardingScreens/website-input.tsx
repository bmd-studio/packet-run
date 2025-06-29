
import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";
import WebsiteInput from "@/components/WebsiteInput";


const ContentWrapper = styled.div`
    padding-left: 360px;
    padding-right: 360px;
`;


const WarningText = styled.p`
    font-size: 24px;
`;
export default function WebsiteInputScreen(props: OnBoardingProps) {
    if (!props.setHost) {
        return null;
    }
    return (

        <OnboardingScreen indicator={{ ...props, showArrows: false }}>
            <ContentWrapper>
                <p>
                    Welke website wil je bezoeken?
                </p>
                <WarningText>
                    Let op! Deze website wordt op het einde ook daadwerkelijk getoond.
                </WarningText>
                <WebsiteInput onHost={props.setHost} />
            </ContentWrapper>
        </OnboardingScreen >
    )

}
