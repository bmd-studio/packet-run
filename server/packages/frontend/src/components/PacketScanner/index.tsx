import { TerminalStatus, useResetTerminalMutation, useScanNfcForTerminalMutation } from '@/data/generated';
import { styled } from 'styled-components';
import { useTerminal } from '@/components/RegisterTerminal';
import useNFCReader from '@/lib/useNFCReader';
import { PropsWithChildren, useEffect, useState } from 'react';
import ScannerAnimation from '@/components/ScannerAnimation';
import { TextContainer, Title } from '@/components/Typography';
import { motion } from 'framer-motion';
import ScannerTimeoutBar from '../ScannerTimeoutBar';

/** The amount of milliseconds between the scanner failing to detect an NFC tag
 * and the terminal being reset. */
const NFC_READER_TIMEOUT = 20_000;

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 32px;
    grid-area: packet;
    padding: 64px 32px 0 32px;
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
`;

export default function PacketScanner({ children }: PropsWithChildren) {
    const terminal = useTerminal();
    const nfcId = useNFCReader();

    const [scannerTimeout, setScannerTimeout] = useState<[Date, Date] | null>(null);

    const [scanNfcForTerminal, { error }] = useScanNfcForTerminalMutation();
    const [resetTerminal] = useResetTerminalMutation();

    useEffect(() => {
        // GUARD: Check that all is in place to send the id to the back-end
        if (nfcId && !terminal.run?.id) {
            scanNfcForTerminal({
                variables: {
                    terminalId: terminal.id,
                    nfcId,
                }
            });
        } else if (!nfcId && !!terminal.run) {
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
                clearTimeout(timeout);
                setScannerTimeout(null);
            };
        }
    }, [terminal.id, nfcId, scanNfcForTerminal, resetTerminal, terminal.run]);
    
    return (
        <Container>
            {scannerTimeout && (
                <ScannerTimeoutBar start={scannerTimeout[0]} end={scannerTimeout[1]} />
            )}
            <RestContainer>
                {children || [
                    terminal.status === TerminalStatus.Idle && (
                        <TextContainer>
                            <Title>PLACE YOUR PACKET</Title>
                            <Title>ON THE SCANNER</Title>
                        </TextContainer>
                    ),
                    terminal.status === TerminalStatus.ScanningNfc && (
                        <TextContainer>
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
                />
            </RestContainer>
            <Card>
                <CardHeader>
                    Terminal {terminal.id} ({terminal.type})
                </CardHeader>
                <CardInnerContainer>
                    {terminal.status === TerminalStatus.Idle && (
                        error && nfcId ? (
                            <h3>Invalid packet detected</h3>
                        ) : (
                            <h3>No packet detected</h3>
                        )
                    )}
                    {terminal.run && (
                        terminal.status === TerminalStatus.ScanningNfc
                        || terminal.status === TerminalStatus.CreatingPacket
                        || terminal.status === TerminalStatus.CreatedPacket
                    ) && (
                        <>
                            <div>
                                <Label>Packet ID</Label>
                                <Text>{terminal.run.id}</Text>
                            </div>
                            {/* <div>
                                <Label>Owner</Label>
                                <Text>BMD Studio</Text>
                            </div> */}
                            <div>
                                <Label>Source IP address</Label>
                                <Text>{terminal.run.origin?.ip || '???'}</Text>
                            </div>
                            <div>
                                <Label>Destination IP address</Label>
                                <Text>{terminal.run.destination?.ip || '???'}</Text>
                            </div>
                        </>
                    )}
                </CardInnerContainer>
            </Card>
        </Container>
    )
}
