 
/* eslint-disable jsx-a11y/alt-text */
import { TerminalStatus, TerminalType, useResetTerminalMutation, useScanNfcForTerminalMutation } from '@/data/generated';
import { styled } from 'styled-components';
import { useTerminal } from '@/components/RegisterTerminal';
import useNFCReader from '@/lib/useNFCReader';
import { PropsWithChildren, useEffect, useState } from 'react';
import ScannerAnimation from '@/components/ScannerAnimation';
import { TextContainer, Title } from '@/components/Typography';
import { motion } from 'framer-motion';
import ScannerTimeoutBar from '../ScannerTimeoutBar';
import { useSearchParams } from 'next/navigation';
import { MODE } from '@/config';
import { usePathname } from 'next/navigation';
import Label from '../Label';


/** The amount of milliseconds between the scanner failing to detect an NFC tag
 * and the terminal being reset. */
const NFC_READER_TIMEOUT = 20_000;

const Container = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 360px;
    height: 1042px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    transform: translateX(-216px);
    z-index: 4; // Make sure it's in front of the element below
`;

const RestContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-direction: column;
    text-align: left;
    gap: 32px;
`;

const PacketDescriptionTextContainer = styled(motion.div)`
    background-color: var(--orange);
    width: 360px; 
    height: 104px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
`;

const PacketDescriptionContainer = styled(motion.div)`
    width: 360px; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const InstructionsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    gap: 32px;
`;

const InstructionsTextContainer = styled.div`
    max-width: 100%;
    padding-left: 16px;
    padding-right: 16px;
`;

const InstructionsTitle = styled.div`
  font-size: 48px;
  line-height: 48px;
  color: var(--white); 
  text-transform: none;
`;

const Text = styled.p`
    font-size: 24px;
    line-height: 34px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default function PacketScanner({ children }: PropsWithChildren) {
    const terminal = useTerminal();
    const nfcId = useNFCReader();
    const searchParams = useSearchParams();

    const [scannerTimeout, setScannerTimeout] = useState<[Date, Date] | null>(null);

    const [scanNfcForTerminal, { error }] = useScanNfcForTerminalMutation();
    const [resetTerminal] = useResetTerminalMutation();

    const pathname = usePathname();
    const isLightBackground = pathname.includes('sender') || pathname.includes('receiver');
    const background = isLightBackground ? 'light' : 'dark';

    const typeLabels: Record<string, string> = {
        GATEWAY: 'de internet poort',
        ROUTER: 'een router', 
        SERVER: 'een server',
        SENDER: 'de computer',
        RECEIVER: 'de computer',
      };
    
      const translatedType = typeLabels[terminal.type] || terminal.type;

    useEffect(() => {
        // GUARD: If we're in standalone mode and the NFC ID is passed as a search parameter, scan the NFC for the terminal
        if (MODE === 'standalone' && searchParams.has('nfcId')
            && terminal.status === TerminalStatus.Idle
        ) {
            scanNfcForTerminal({
                variables: {
                    terminalId: terminal.id,
                    nfcId: searchParams.get('nfcId') as string,
                }
            });
        }
    }, [terminal.id, searchParams, terminal.status]);

    useEffect(() => {
        // GUARD: Don't do anything when there isn't any NFC that is being
        // scanned currently. Resetting happens in the other hook
        if (!nfcId) return;

        async function sendNfcToTerminal() {
            // GUARD: If the terminal is currently set to another nfcId, reset
            // the terminal first.
            if (terminal.run?.nfcId !== nfcId) {
                await resetTerminal({ variables: { terminalId: terminal.id }});
            }
    
            // Scan the NFC for the terminal
            scanNfcForTerminal({
                variables: {
                    terminalId: terminal.id,
                    nfcId: nfcId!,
                }
            });
        }

        sendNfcToTerminal();
    }, [terminal.id, nfcId, scanNfcForTerminal, resetTerminal, terminal.run]);

    useEffect(() => {
        // GUARD: Don't timeout in standalone mode
        if (MODE === 'standalone') return;

        // GUARD: Wait for nfcId to become null and a run to be set
        if (nfcId || !terminal.run) {
            return;
        }

        // Set a timeout for the terminal to be reset. Also, store the date for
        // this in state, so we can display a bar at the top of the screen
        const now = new Date().getTime();
        setScannerTimeout([
            new Date(now + 1_000),
            new Date(now + 20_000),
        ]);
        const timeout = setTimeout(() => {
            resetTerminal({ variables: { terminalId: terminal.id }});
            setScannerTimeout(null);
        }, NFC_READER_TIMEOUT);

        return () => {
            // If anything changes, clear the timeouts
            clearTimeout(timeout);
            setScannerTimeout(null);
        };
    }, [nfcId, terminal.run, resetTerminal, terminal.id]);
    
    return (
        <Container key="packet-scanner">
            {scannerTimeout && (
                <ScannerTimeoutBar start={scannerTimeout[0]} end={scannerTimeout[1]} />
            )}
            
            <InstructionsContainer>
                <Label>
                    INSTRUCTIES
                </Label>
                    {children || [
                        terminal.status === TerminalStatus.Idle && (
                            <InstructionsTextContainer key="idle">
                                <InstructionsTitle>Welkom bij {translatedType}.</InstructionsTitle><br></br> 
                                <InstructionsTitle>Lees eerst links de uitleg.</InstructionsTitle>
                            </InstructionsTextContainer>
                        ),
                        terminal.status === TerminalStatus.ScanningNfc && (
                            <InstructionsTextContainer key="scanning-nfc">
                                <InstructionsTitle>Jij kiest de volgende route! Pak de bal, en werp die in een van de routes.</InstructionsTitle>
                            </InstructionsTextContainer>
                        ),
                        terminal.type === TerminalType.Server && terminal.status === TerminalStatus.ScanningNfc && (
                            <InstructionsTextContainer key="scanning-nfc">
                                <InstructionsTitle>Doe de hendel van de scanner rustig DICHT en weer OPEN.</InstructionsTitle>
                            </InstructionsTextContainer>
                        )
                    ]}
            </InstructionsContainer>
                <PacketDescriptionContainer>
                    <ScannerAnimation
                        variant={
                            terminal.status === TerminalStatus.ScanningNfc 
                                || terminal.status === TerminalStatus.CreatingPacket
                                || terminal.status === TerminalStatus.CreatedPacket
                                ? 'scanned' 
                                : (nfcId ? 'scanning' : 'empty')}
                        background={background}
                        isServer={terminal.type === 'SERVER'}
                    />
                    <PacketDescriptionTextContainer>
                        {terminal.status === TerminalStatus.Idle && (
                            error && nfcId ? (
                                <Text>Ongeldig pakket gescand</Text>
                            ) : (
                                <Text>Geen pakket gescand</Text>
                            )
                        )}
                        {terminal.run && (
                            terminal.status === TerminalStatus.ScanningNfc
                            || terminal.status === TerminalStatus.CreatingPacket
                            || terminal.status === TerminalStatus.CreatedPacket
                        ) && (
                            <>
                                <div>
                                    <Text>Verzoek voor website:</Text>
                                    <Text>{terminal.run.url}</Text>
                                </div>
                            </>
                        )}
                    </PacketDescriptionTextContainer>
                <Label>
                    SCANNER
                </Label>
                </PacketDescriptionContainer>
        </Container>
    )
}
