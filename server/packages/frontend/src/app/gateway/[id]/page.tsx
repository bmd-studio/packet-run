'use client';

import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus } from "@/data/generated";
import RegisterTerminal from '@/components/RegisterTerminal';
import PacketScanner from '@/components/PacketScanner';
import Grid from '@/components/Grid';
import { AnimatePresence } from 'framer-motion';
import Explanation from '@/components/Explanation';
import Label from '@/components/Label';
import RouterMap from '@/components/RouterMap';

export default function Gateway() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <AnimatePresence>
                        {terminal.status === TerminalStatus.ScanningNfc ? (
                            <React.Fragment key="scanning-nfc-content">
                                <DestinationBar />
                                <RouterMap />
                            </React.Fragment>
                        ) :
                            <>
                                <DestinationBar />
                                <Explanation imageSrc='/icon_terminal.svg' imageAlt='A classical roman style entrance to a temple'>
                                    <Label>
                                        De internetpoort - uitleg
                                    </Label>
                                    <p>
                                        Stel je voor: je huis zit vol slimme apparaten — telefoons, laptops, gameconsoles. Binnen praten ze makkelijk met elkaar. Maar zodra ze iets buiten het huis willen doen, zoals een filmpje kijken of een bericht sturen, hebben ze hulp nodig.

                                    </p>
                                    <p>
                                        Daarom is er een internetpoort: een slimme verkeersregelaar. Alle informatie die naar buiten gaat, passeert deze poort.
                                        De internetpoort weet precies waar alles heen moet. Zonder haar zouden je apparaten verdwalen in de wirwar van het internet.

                                    </p>
                                    <p>
                                        Elke keer dat je een website bezoekt of een app gebruikt, helpt de poort je veilig en snel op weg.

                                    </p>
                                    <p>
                                        Plaats je bal op de scanner om te starten.
                                    </p>
                                </Explanation>
                            </>
                        }
                        <PacketScanner key="packet-scanner" />
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    );
} 
