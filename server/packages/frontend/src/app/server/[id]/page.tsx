'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { AnimatePresence } from 'framer-motion';
import PacketScanner from '@/components/PacketScanner';
import { TerminalStatus } from '@/data/generated';
import DestinationBar from '@/components/DestinationBar';
import ForgeManager from './manager';
import React from 'react';
import Explanation from '@/components/Explanation';
import Label from '@/components/Label';
import RouterMap from '@/components/RouterMap';

export default function Server() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <AnimatePresence>
                        {
                            (
                                terminal.status === TerminalStatus.ScanningNfc
                                || terminal.status === TerminalStatus.CreatingPacket
                                || terminal.status === TerminalStatus.CreatedPacket
                            ) ? (
                                    <React.Fragment key="scanning-nfc-content">
                                        <DestinationBar />
                                        <RouterMap />
                                    </React.Fragment>
                                ) :
                                <>
                                    <DestinationBar />
                                    <Explanation imageSrc='/icon_server.svg' imageAlt='Icon of a server'>
                                        <Label>
                                            De server - uitleg
                                        </Label>
                                        <p>
                                            {`Als jouw verzoekpakketje aankomt bij de server, gaat die meteen aan het werk. In het pakketje staat bijvoorbeeld de vraag: "Laat mij de homepage van YouTube zien."
                                            De server leest wat je vraagt, zoekt de juiste informatie op en maakt een nieuw pakketje met het antwoord. Dat antwoord wordt dan teruggestuurd naar jouw computer.`}

                                        </p>
                                        <p>
                                            {`Normaal moet dat antwoordpakketje weer langs allerlei routers en netwerken terugreizen, net als op de heenweg. Maar in deze installatie hebben we iets speciaals toegevoegd: een "wormhole" — een soort geheime snelweg. Daarmee kan het pakketje in één keer terug naar jouw internetpoort, zonder alle tussenstops. Zo kun je extra goed zien hoe het werkt én ben je supersnel terug. Je zult straks zien als je je bal scant dat je naast de “wormhole” - aka de korte route - ook gewoon de volledige lange route kan nemen. De keuze is aan jou!`}
                                        </p>
                                        <p>
                                            {`Maar eerst gaan we het “antwoordpakketje” klaarmaken. Als je er klaar voor bent leg dan de bal op de scanner.`}
                                        </p>
                                    </Explanation>
                                </>
                        }
                        <PacketScanner key="packet-scanner" />
                    </AnimatePresence>
                    <ForgeManager />
                </Grid>
            )}
        </RegisterTerminal>
    )
} 
