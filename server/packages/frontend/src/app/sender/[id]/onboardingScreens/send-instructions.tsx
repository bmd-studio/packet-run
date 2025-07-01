
import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { styled } from 'styled-components';
import { OnBoardingProps } from "./types";
import CheckBoxListItem from "@/components/CheckBoxListItem";
import ScannerTimeoutBar from "@/components/ScannerTimeoutBar";
import { useEffect, useState } from "react";
import PacketScanner from "@/components/PacketScanner";

const ContentWrapper = styled.div`
    padding-left: 216px;
    padding-right: 592px;

`
const TitleWrapper = styled.h2`
    font-size: 48px;
`;
const List = styled.ul`
    &:last-child {
        margin-bottom: 0px;
    }
    
`;
const ListItem = styled.div`
    font-size: 40px;
`
export interface SendInstructionsProps extends OnBoardingProps {
    ballPresent: boolean;
    ballPressed: boolean;
    runId: string | undefined;
    resetCallback: () => void;
}

const AFTER_BALL_PRESSED_TIMEOUT = 5_000;

export default function SendInstructions(props: SendInstructionsProps) {
    const { ballPresent, ballPressed, resetCallback, runId } = props;
    const [[startDate, endDate], setDates] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);

    useEffect(() => {
        if (ballPresent || !runId) return;

        // Set the start date
        const now = Date.now();
        const start = new Date(now);

        // Set the end date
        const end = new Date(now + AFTER_BALL_PRESSED_TIMEOUT);

        // Set the timeout
        const timeout = setTimeout(() => {
            resetCallback();
        }, AFTER_BALL_PRESSED_TIMEOUT);

        // Set the dates
        setDates([start, end]);

        // Clear the timeout if a new loop is started
        return () => clearTimeout(timeout);
    }, [ballPresent, runId, resetCallback]);

    return (
        <OnboardingScreen indicator={{ ...props, showSteps: false, showArrows: false, hideBottom: true }}>
            <ContentWrapper>
                <TitleWrapper>
                    Volg deze instructies:
                </TitleWrapper>
                <List>
                    <CheckBoxListItem checked={ballPresent}>
                        <ListItem>
                            Pak een bal uit de bak LINKS en plaats deze op de ORANJE scanner naast het toetsenbord.
                        </ListItem>
                    </CheckBoxListItem>
                    <CheckBoxListItem checked={ballPressed || !!runId}>
                        <ListItem>
                            SLUIT de hendel. Zo persen we het verzoek voor je website in het pakketje.
                        </ListItem>
                    </CheckBoxListItem>
                    <CheckBoxListItem checked={!!runId && !ballPressed}>
                        <ListItem>
                            OPEN de hendel en pak de bal.
                        </ListItem>
                    </CheckBoxListItem>
                    <p>
                        Als je deze drie stappen hebt voltooid, gooi dan je bal RECHTSBOVEN in het gat om deze naar het internet op te sturen.
                    </p>
                </List>
            </ContentWrapper>
            <PacketScanner key="packet-scanner" animation="onboarding" />
            <ScannerTimeoutBar
                start={startDate}
                end={endDate}
            />
        </OnboardingScreen>
    )

}
