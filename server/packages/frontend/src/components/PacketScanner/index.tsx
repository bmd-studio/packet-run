

import { TerminalStatus, TerminalType, useResetTerminalMutation, useScanNfcForTerminalMutation } from '@/data/generated';
import { styled } from 'styled-components';
import { useTerminal } from '@/components/RegisterTerminal';
import useNFCReader from '@/lib/useNFCReader';
import { PropsWithChildren, useEffect, useState } from 'react';
import ScannerAnimation, { ScannerVariant } from '@/components/ScannerAnimation';
import { motion } from 'framer-motion';
import ScannerTimeoutBar from '../ScannerTimeoutBar';
import { useSearchParams } from 'next/navigation';
import { MODE } from '@/config';
import { usePathname } from 'next/navigation';
import Label from '../Label';
import InstructionText, { selectInstructionType } from './text';


/** The amount of milliseconds between the scanner failing to detect an NFC tag
 * and the terminal being reset. */
const NFC_READER_TIMEOUT = 20_000;

const Container = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 360px;
    height: calc(100vh - 36px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    transform: translateX(-216px);
    z-index: 4; // Make sure it's in front of the element below
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


const Text = styled.p`
    font-size: 24px;
    line-height: 34px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function selectAnimationType(terminalType: TerminalType, terminalStatus: TerminalStatus): ScannerVariant {
    if (terminalType !== TerminalType.Server) {
        if (terminalStatus === TerminalStatus.Idle) {
            return 'empty';
        }
        return 'scanned';
    }
    // else it has the type of SERVER
    if (terminalStatus === TerminalStatus.Idle) {
        return 'empty';
    }
    return 'pressing';
}
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

    console.log({ terminal });
    const textType = selectInstructionType(terminal.type, terminal.status);
    const animationType = selectAnimationType(terminal.type, terminal.status);



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
                await resetTerminal({ variables: { terminalId: terminal.id } });
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
            resetTerminal({ variables: { terminalId: terminal.id } });
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
                {children ||
                    <InstructionText type={textType} />
                }
            </InstructionsContainer>
            <PacketDescriptionContainer>
                <ScannerAnimation
                    variant={animationType}
                    background={background}
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
