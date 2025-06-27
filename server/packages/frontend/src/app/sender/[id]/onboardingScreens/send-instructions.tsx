
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
    pressOpen: boolean;
    resetCallback: () => void;
}

export default function SendInstructions(props: SendInstructionsProps) {
    const { ballPresent, ballPressed, pressOpen, resetCallback } = props;
    const TOTAL_TIMEOUT = 15000;
    const AFTER_BALL_PRESSED_TIMEOUT = 5000;
    const [startDate, setStartDate] = useState<undefined | Date>(undefined);
    const [endDate, setEndDate] = useState<undefined | Date>(undefined);
    const [endTimeout, setEndTimeout] = useState<undefined | number>(undefined);
    useEffect(() => {
        const now = Date.now();
        setStartDate(new Date(now));
        setEndDate(new Date(now + TOTAL_TIMEOUT));
        if (endTimeout) {
            clearTimeout(endTimeout)
        }
        setEndTimeout(setTimeout(() => {
            resetCallback();
        }, TOTAL_TIMEOUT) as unknown as number);
        return () => {
            clearTimeout(endTimeout)
        }
    }, [resetCallback, endTimeout]);

    useEffect(() => {
        if (!ballPressed) {
            return;
        }
        if (!endDate) {
            const now = Date.now();
            setStartDate(new Date(now));
            setEndDate(new Date(now + AFTER_BALL_PRESSED_TIMEOUT));
            if (endTimeout) {
                clearTimeout(endTimeout)
            }
            setEndTimeout(setTimeout(() => {
                resetCallback();
            }, AFTER_BALL_PRESSED_TIMEOUT) as unknown as number);
            return;
        }
        const timeRemaining = endDate.getTime() - Date.now();
        if (timeRemaining > AFTER_BALL_PRESSED_TIMEOUT) {
            const now = Date.now();
            setEndDate(new Date(now + AFTER_BALL_PRESSED_TIMEOUT));
            if (endTimeout) {
                clearTimeout(endTimeout)
            }
            setEndTimeout(setTimeout(() => {
                resetCallback();
            }, AFTER_BALL_PRESSED_TIMEOUT) as unknown as number);
        }
    }, [ballPressed, endDate, endTimeout, resetCallback]);


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
                    <CheckBoxListItem checked={ballPressed}>
                        <ListItem>
                            SLUIT de hendel. Zo persen we het verzoek voor je website in het pakketje.
                        </ListItem>
                    </CheckBoxListItem>
                    <CheckBoxListItem checked={pressOpen}>
                        <ListItem>
                            OPEN de hendel en pak de bal.
                        </ListItem>
                    </CheckBoxListItem>
                    <p>
                        Als je deze drie stappen hebt voltooid, gooi dan je bal RECHTSBOVEN in het gat om deze naar het internet op te sturen.
                    </p>
                </List>
            </ContentWrapper>
            <PacketScanner key="packet-scanner" />
            <ScannerTimeoutBar
                start={startDate}
                end={endDate}
            />
        </OnboardingScreen>
    )

}
