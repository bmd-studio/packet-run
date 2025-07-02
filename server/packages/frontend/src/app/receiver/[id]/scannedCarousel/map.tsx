import styled from "styled-components";
import { OffboardingScreenProps } from "../types";
import { OnboardingScreen } from "@/components/OnBoardingScreen";
import Map from "@/components/Map";

const MapContainer = styled.div`
    width: 100%;
    height: calc(100vh - 224px);
    top: 224px;
`;

export default function MapView(props: OffboardingScreenProps) {
    return (
        <OnboardingScreen indicator={{ ...props }} >
            <MapContainer>
                <Map shouldDisplayMap={true} delayed={false} />
            </MapContainer>
        </OnboardingScreen>
    );

}
