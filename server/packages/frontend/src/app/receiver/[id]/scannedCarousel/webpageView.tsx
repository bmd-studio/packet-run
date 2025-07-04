import { useTerminal } from "@/components/RegisterTerminal";
import styled from "styled-components";
import { BACKEND_URL } from '@/config';
import { OffboardingScreenProps } from "../types";
import { OnboardingScreen } from "@/components/OnBoardingScreen";

const ImageContainer = styled.div`
    width: 100%;
    height: calc(100vh - 224px);
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top center;
    background-color: var(--light-gray);
`;

const FallbackContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 18px;
    text-align: center;
    padding: 20px;
    gap: 48px;

    h1 {
        font-size: 48px;
    }
`;


export default function WebpageView(props: OffboardingScreenProps) {
    const terminal = useTerminal();

    return (

        <OnboardingScreen indicator={{ ...props, customNextText: "Overzicht" }} >
            <ImageContainer>
                {terminal.run?.imagePath ? (
                    <Image alt="Browser screen" src={`${BACKEND_URL}/${terminal.run?.imagePath}`} />
                ) : (
                    <FallbackContainer>
                        <h1>{':('}</h1>
                        <p>Het is helaas niet gelukt om je website te laden. Je kunt wel je route bekijken!</p>
                    </FallbackContainer>
                )}
            </ImageContainer>
        </OnboardingScreen>
    );

}
