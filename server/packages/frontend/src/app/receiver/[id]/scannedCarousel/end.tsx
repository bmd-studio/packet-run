
import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OffboardingScreenProps } from "../types";

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

`
const TextWrapper = styled.div`
    width: 62.5vw;
    height: 100%;
    flex-direction: column;
    & p {
        font-size: 40px;
    }
`;
const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content:space-between;
    & img {
        height: 100px;
    }

`;

// TODO: add the packet scanner
export default function End(props: OffboardingScreenProps) {
    return (
        <OnboardingScreen indicator={{ ...props, customNextText: "Afsluiten" }}>
            <ContentWrapper>
                <TextWrapper>
                    <p>
                        Dankje voor het gebruik van Packet Run.
                    </p>
                    <p>
                        Stop je bal terug in het gat RECHTS BOVEN.
                    </p>
                    <p>
                        Packet Run werd mogelijk gemaakt door:
                        Bureau Moeilijke Dingen, Studio Falkland & SIDN Labs
                    </p>
                    <ImageWrapper>
                        <img src="/bmd-logo.svg" alt="Logo Bureau Moeilijke Dingen" />
                        <img src="/falkland-logo.svg" alt="Logo Studio Falkland" />
                        <img src="/SIDN-labs-logo.svg" alt="Logo SIDN LABS" />
                    </ImageWrapper>
                </TextWrapper>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
