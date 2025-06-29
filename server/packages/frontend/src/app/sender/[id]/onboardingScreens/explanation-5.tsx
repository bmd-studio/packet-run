import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";


const ContentWrapper = styled.div`
    padding-left: 200px;
    padding-right: 0;
    display: flex;
    flex-direction: row;
    gap:32px;
    height: 100%;
`

const TextWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 66%;
  & p {
    margin-bottom: 60px;
  }
`;

const ImageWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
`;
const Image = styled.img`
  width: 110%;
  position: relative;
  top: -100px;
`;

export default function Explanation5(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <ContentWrapper>
                <TextWrapper>
                    <p>De metalen buizen symboliseren de routers.</p>
                    <p>Via deze buizen reist je pakketje van router naar router. De installatie is een fysieke representatie van mogelijke routes die pakketjes op het internet kunnen nemen.</p>
                    <p>Onderweg leer je wie er achter het internet zit en welke risico{`'`}s daarbij horen.</p>
                </TextWrapper>
                <ImageWrapper>
                    <Image src='/onboarding-installation-graphic.svg' alt="Packet Run installation" />
                </ImageWrapper>
            </ContentWrapper>
        </OnboardingScreen>
    )

}
