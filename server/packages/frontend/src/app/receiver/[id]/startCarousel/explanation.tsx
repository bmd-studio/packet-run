import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OffboardingScreenProps } from "../types";
import PacketDescription from "@/components/PacketDescription";
import { useTerminal } from "@/components/RegisterTerminal";
import useNFCReader from "@/lib/useNFCReader";
import { Terminal } from "@/data/generated";


const ContentWrapper = styled.div`
    padding-left: 11.25vw;
    width: 100%;
    height: calc(100vh - 224px);
    box-sizing: border-box;
`
const Container = styled.div`
    display:flex;
    height: 100%;
    flex-direction: row;
    justify-content: start;
`;
const TextWrapper = styled.div`
    width: 58vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
        font-size: 40px;
    }
`;

const ScannerWrapper = styled.div`
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: end;
    & p {
        margin: 0px;
    }
`;
// TODO: add the packet scanner
export default function Explanation(props: OffboardingScreenProps) {

    const terminal = useTerminal();
    const nfcId = useNFCReader();

    return (
        <OnboardingScreen indicator={{ ...props }}>
            <ContentWrapper>
                <Container>
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
                    <ScannerWrapper>
                        <PacketDescription terminal={terminal as unknown as Terminal} nfcId={nfcId || undefined} />
                    </ScannerWrapper>
                </Container>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
