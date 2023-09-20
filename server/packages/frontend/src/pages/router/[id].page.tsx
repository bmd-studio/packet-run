import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus } from "@/data/generated";
import RegisterTerminal from '@/components/RegisterTerminal';
import PacketScanner from '@/pages/router/scanner';
import Map from '@/components/Map';
import Grid from '@/components/Grid';
import LoadNFCForTerminal from '@/components/LoadNFCForTerminal';
import { DEBUG } from '@/config';
import { AnimatePresence } from 'framer-motion';
import Journey from '@/components/Journey';

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <AnimatePresence>
                        {terminal.status === TerminalStatus.ScanningNfc && (
                            <>
                                <DestinationBar key="destination-bar" />
                                <Map key="map" />
                                <Journey key="journey" />
                            </>
                        )}
                        <PacketScanner />
                        {DEBUG && <LoadNFCForTerminal />}
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    );
}
