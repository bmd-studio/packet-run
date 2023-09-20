import { TerminalStatus, useResetTerminalMutation, useScanNfcForTerminalMutation } from '@/data/generated';
import { styled } from 'styled-components';
import { useTerminal } from '@/components/RegisterTerminal';
import useNFCReader from '@/lib/useNFCReader';
import { useEffect, useState } from 'react';
import ScannerAnimation from '@/components/ScannerAnimation';
import { Title } from '@/components/Typography';
import { motion } from 'framer-motion';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 32px;
    grid-area: packet;
    padding: 32px 32px 0 32px;
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
`;

const Label = styled.p`

`;

const Text = styled.h2`
    font-size: 30px;
    line-height: 28px;
`;

export default function PacketScanner() {
    const terminal = useTerminal();
    const [wasScannedViaNfcReader, setScannedViaNFCReader] = useState(false);
    const [scanNfcForTerminal, { loading: loadingNfc }] = useScanNfcForTerminalMutation();
    const [resetTerminal, { loading: loadingIdle }] = useResetTerminalMutation();
    const nfcId = useNFCReader();

    useEffect(() => {
        if (nfcId && !loadingNfc && !terminal.run?.id) {
            scanNfcForTerminal({
                variables: {
                    terminalId: terminal.id,
                    nfcId,
                }
            });
            setScannedViaNFCReader(true);
        } else if (!nfcId && !loadingIdle && !!terminal.run && wasScannedViaNfcReader) {
            resetTerminal({ variables: { terminalId: terminal.id }});
        }
    }, [terminal.id, nfcId, scanNfcForTerminal, loadingNfc, loadingIdle, resetTerminal, terminal.run, wasScannedViaNfcReader]);
    
    return (
        <Container>
            <RestContainer>
                <Title>Place your packet <br /> on the scanner</Title>
                <ScannerAnimation variant={terminal.status === TerminalStatus.ScanningNfc ? 'scanned' : (nfcId ? 'scanning' : 'empty')} />
            </RestContainer>
            <Card>
                <CardHeader>
                    Terminal {terminal.id} ({terminal.type})
                </CardHeader>
                <CardInnerContainer>
                    {terminal.status === TerminalStatus.Idle && (
                        <h3>No packet detected</h3>
                    )}
                    {terminal.status === TerminalStatus.ScanningNfc && terminal.run && (
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
