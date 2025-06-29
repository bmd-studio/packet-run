'use client';

import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus } from "@/data/generated";
import RegisterTerminal from '@/components/RegisterTerminal';
import PacketScanner from '@/components/PacketScanner';
import Map from '@/components/Map';
import Grid from '@/components/Grid';
import { AnimatePresence } from 'framer-motion';
import Journey from '@/components/Journey';
import Stars from '@/components/Stars';
import InfoBox from '@/components/InfoBox';

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <AnimatePresence>
                        {terminal.status === TerminalStatus.ScanningNfc && (
                            <React.Fragment key="scanning-nfc-content">
                                <DestinationBar />
                                {terminal.run?.currentHop.address ? (
                                    <Map />
                                ) : (
                                    <Stars />
                                )}
                            </React.Fragment>
                        )}
                        <PacketScanner key="packet-scanner" />
                        {/* {MODE === 'standalone' && <LoadNFCForTerminal key="load-nfc" />} */}
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    );
} 
