import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { AnimatePresence } from 'framer-motion';
import PacketScanner from '../../components/PacketScanner';
import { TerminalStatus } from '@/data/generated';
import DestinationBar from '@/components/DestinationBar';
import Journey from '@/components/Journey';
import Map from '@/components/Map';
import LoadNFCForTerminal from '@/components/LoadNFCForTerminal';
import { DEBUG } from '@/config';
import { Title } from '@/components/Typography';
import ForgeManager from './manager';
import styled from 'styled-components';

const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 128px;
`;

export default function Server() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <AnimatePresence>
                        {terminal.status === TerminalStatus.Idle && (
                            <>
                                <PacketScanner key="packet-scanner" />
                            </>
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && (
                            <>
                                <Centered key="centered">
                                    <Title>
                                        Your packet has arrived at {terminal.run?.url}. <br /><br />
                                        Now, answer the request by creating a response packet.
                                    </Title>
                                </Centered>
                                <PacketScanner key="packet-scanner">
                                    <Title>Use the handle to forge a new packet</Title>
                                </PacketScanner>
                            </>
                        )}
                        {terminal.status === TerminalStatus.CreatingPacket && (
                            <>
                                <PacketScanner key="packet-scanner">
                                    Your packet is being created now!
                                </PacketScanner>
                            </>
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <>
                                <DestinationBar key="destination-bar" />
                                <Map key="map" />
                                <Journey key="journey" />
                                <PacketScanner key="packet-scanner">
                                    <Title>Now, navigate back to the home PC</Title>
                                </PacketScanner>
                            </>
                        )}
                        {DEBUG && <LoadNFCForTerminal key="load-nfc" />}
                        <ForgeManager key="forge-manager" />
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    )
}