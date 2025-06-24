import { useTerminal } from "@/components/RegisterTerminal";
import styled from "styled-components";
import { BACKEND_URL } from '@/config';
import { OffboardingScreenProps } from "../types";
import { OnboardingScreen } from "@/components/OnBoardingScreen";

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top center;
    background-color: var(--light-gray);
`;
export default function WebpageView(props: OffboardingScreenProps) {
    const terminal = useTerminal();

    return (

        <OnboardingScreen indicator={{ ...props, customNextText: "Overzicht" }} >
            <ImageContainer>
                <Image alt="Browser screen" src={`${BACKEND_URL}/${terminal.run?.imagePath}`} />
            </ImageContainer>
        </OnboardingScreen>
    );

}
