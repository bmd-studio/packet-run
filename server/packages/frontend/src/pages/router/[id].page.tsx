import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus } from "@/data/generated";
import RegisterTerminal from '@/components/RegisterTerminal';
import NfcScanner from '@/components/NfcScanner';
import PacketInfo from '@/components/PacketInfo';
import Map from '@/components/Map';
import { Grid } from 'lucide-react';
import { Title } from '@/components/Typography';

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <>
                    {terminal.status === TerminalStatus.ScanningNfc && (
                        <Grid>
                            <DestinationBar />
                            <Map />
                            <PacketInfo>
                                <Title>Send your packet to the next destination</Title>
                            </PacketInfo>
                        </Grid>
                    )}
                    {terminal.status === TerminalStatus.Idle && (
                        <NfcScanner terminalId={terminal.id}/>
                    )}
                </>
            )}
        </RegisterTerminal>
    );
}
