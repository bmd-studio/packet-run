import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus } from "@/data/generated";
import RegisterTerminal from '@/components/RegisterTerminal';
import PacketScanner from '@/pages/router/scanner';
import Map from '@/components/Map';
import Grid from '@/components/Grid';
import LoadNFCForTerminal from '@/components/LoadNFCForTerminal';
import { DEBUG } from '@/config';

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    {terminal.status === TerminalStatus.ScanningNfc && (
                        <>
                            <DestinationBar />
                            <Map />
                        </>
                    )}
                    <PacketScanner />
                    {DEBUG && <LoadNFCForTerminal />}
                </Grid>
            )}
        </RegisterTerminal>
    );
}
