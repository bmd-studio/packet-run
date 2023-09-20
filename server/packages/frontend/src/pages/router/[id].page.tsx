import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus } from "@/data/generated";
import RegisterTerminal from '@/components/RegisterTerminal';
import PacketScanner from '@/pages/router/scanner';
import PacketInfo from '@/components/PacketInfo';
import Map from '@/components/Map';
import { Title } from '@/components/Typography';
import Grid from '@/components/Grid';

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    {terminal.status === TerminalStatus.ScanningNfc && (
                        <>
                            <DestinationBar />
                            <Map />
                            <PacketInfo>
                                <Title>Send your packet to the next destination</Title>
                            </PacketInfo>
                        </>
                    )}
                    <PacketScanner />
                </Grid>
            )}
        </RegisterTerminal>
    );
}
