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
// import useHallSensor from '@/lib/useHallSensor';
// import useNFCReader from '@/lib/useNFCReader';

export default function Server() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <AnimatePresence>
                        {terminal.status === TerminalStatus.Idle && (
                            <>
                                <PacketScanner />
                            </>
                        )}
                        {terminal.status === TerminalStatus.CreatingPacket && (
                            <>
                                <div>
                                    <Title>
                                        Your package has arrived at {terminal.run?.url}. Now, answer the request by creating a response packet.
                                    </Title>
                                </div>
                                <PacketScanner>
                                    <Title>Use the handle to forge a new packet</Title>
                                </PacketScanner>
                            </>
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <>
                                <DestinationBar key="destination-bar" />
                                <Map key="map" />
                                <Journey key="journey" />
                                <PacketScanner>
                                    <Title>Now, navigate back to the home PC</Title>
                                </PacketScanner>
                            </>
                        )}
                        {DEBUG && <LoadNFCForTerminal />}
                        <ForgeManager />
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    )
}