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
import Explanation from '@/components/Explanation';
import Label from '@/components/Label';
import { PatternedBackgroundDark } from '@/components/PatternedBackground';

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <PatternedBackgroundDark />
                    <AnimatePresence>
                        {terminal.status === TerminalStatus.ScanningNfc ? (
                            <React.Fragment key="scanning-nfc-content">
                                <DestinationBar />
                                <Map />
                            </React.Fragment>
                        ) :
                            <>
                                <DestinationBar />
                                <Explanation imageSrc='/icon-router.svg' imageAlt='Icon of a router'>

                                    <Label>
                                        De router - uitleg
                                    </Label>
                                    <p>
                                        Een router ontvangt het datapakketje en leest het digitale adres dat erop staat. Vervolgens bepaalt de router welke kant het op moet, zodat het pakketje dichter bij de bestemming komt. Vaak wordt het doorgestuurd naar een ander netwerk of naar een volgende router.

                                    </p>
                                    <p>
                                        Onderweg passeert het pakketje meerdere routers waarvan dit er één is. Deze routers werken samen om alles soepel en snel te laten verlopen. Zonder routers zou al het internetverkeer in de war raken.
                                    </p>
                                    <p>
                                        Op dit moment heb je in de echte wereld als persoon geen controle over welke routers je pakketje uitlezen en doorsturen.
                                    </p>
                                    <p>
                                        Met Packet Run heb je deze controle wel, en kun je ervoor kiezen om bijvoorbeeld bepaalde routes te vermijden en een alternatieve route nemen.
                                    </p>
                                </Explanation>
                            </>
                        }
                        <PacketScanner key="packet-scanner" />
                        {/* {MODE === 'standalone' && <LoadNFCForTerminal key="load-nfc" />} */}
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    );
} 
