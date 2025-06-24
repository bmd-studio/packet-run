 
/* eslint-disable jsx-a11y/alt-text */
import { TerminalStatus, useResetTerminalMutation, useScanNfcForTerminalMutation } from '@/data/generated';
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

/** The amount of milliseconds between the scanner failing to detect an NFC tag
 * and the terminal being reset. */
const NFC_READER_TIMEOUT = 20_000;

const Container = styled(motion.div)`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 32px;
    grid-area: packet;
    padding: 64px 32px 0 32px;
    overflow: scroll;
`;

const RestContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-direction: column;
    text-align: center;
    gap: 32px;
`;

const Card = styled.div`
    flex-grow: 0;
    width: 66%;
`;

const CardHeader = styled.h4`
    background-color: var(--medium-gray );
    padding: 8px 32px;
    font-size: 24px;
`;

const CardInnerContainer = styled(motion.div)`
    background-color: var(--light-gray);
    padding: 32px;
    font-size: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Label = styled.p`
    font-size: 20px;
`;

const Text = styled.h2`
    font-size: 30px;
    line-height: 28px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const IPs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
            <RestContainer>
                {children || [
                    terminal.status === TerminalStatus.Idle && (
                        <TextContainer key="idle">
                            <Title>PLACE YOUR PACKET</Title>
                            <Title>ON THE SCANNER</Title>
                        </TextContainer>
                    ),
                    terminal.status === TerminalStatus.ScanningNfc && (
                        <TextContainer key="scanning-nfc">
                            <Title>GUIDE YOUR</Title>
                            <Title>PACKET ONWARDS</Title>
                        </TextContainer>
                    )
                ]}
                <ScannerAnimation
                    variant={
                        terminal.status === TerminalStatus.ScanningNfc 
                            || terminal.status === TerminalStatus.CreatingPacket
                            || terminal.status === TerminalStatus.CreatedPacket
                            ? 'scanned' 
                            : (nfcId ? 'scanning' : 'empty')}
                    background={background}
                />
            </RestContainer>
            <Card>
                <CardHeader>
                    Terminal {terminal.id} ({terminal.type})
                </CardHeader>
                <CardInnerContainer>
                    {terminal.status === TerminalStatus.Idle && (
                        error && nfcId ? (
                            <h3>Invaliede pakketje gescand</h3>
                        ) : (
                            <h3>Geen pakketje gescand</h3>
                        )
                    )}
                    {terminal.run && (
                        terminal.status === TerminalStatus.ScanningNfc
                        || terminal.status === TerminalStatus.CreatingPacket
                        || terminal.status === TerminalStatus.CreatedPacket
                    ) && (
                        <>
                            <div>
                                <Label>Verzoek voor website</Label>
                                <Text>{terminal.run.url}</Text>
                            </div>
                        </>
                    )}
                </CardInnerContainer>
            </Card>
        </Container>
    )
}
