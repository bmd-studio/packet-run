'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { AnimatePresence, motion } from 'framer-motion';
import PacketScanner from '@/components/PacketScanner';
import { TerminalStatus } from '@/data/generated';
import DestinationBar from '@/components/DestinationBar';
import Journey from '@/components/Journey';
import { TextContainer, Title } from '@/components/Typography';
import ForgeManager from './manager';
import styled from 'styled-components';
import ArrowWithLabel from '@/components/ArrowWithLabel';
import InfoBox from '@/components/InfoBox';
import React from 'react';
import Explanation from '@/components/Explanation';
import Label from '@/components/Label';
import RouterMap from '@/components/RouterMap';

const Centered = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 128px;
    gap: 8px;
`;

// FIXME: Need to re-add the control logic for pressing a packet.
export default function Server() {
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
                                <Explanation imageSrc='/icon_server.svg' imageAlt='Icon of a server'>
                                    <Label>
                                        De server - uitleg
                                    </Label>
                                    <p>
                                        Als jouw verzoekpakketje aankomt bij de server, gaat die meteen aan het werk. In het pakketje staat bijvoorbeeld de vraag: "Laat mij de homepage van YouTube zien."
                                        De server leest wat je vraagt, zoekt de juiste informatie op en maakt een nieuw pakketje met het antwoord. Dat antwoord wordt dan teruggestuurd naar jouw computer.

                                    </p>
                                    <p>
                                        Normaal moet dat antwoordpakketje weer langs allerlei routers en netwerken terugreizen, net als op de heenweg. Maar in deze installatie hebben we iets speciaals toegevoegd: een "wormhole" — een soort geheime snelweg. Daarmee kan het pakketje in één keer terug naar jouw internetpoort, zonder alle tussenstops. Zo kun je extra goed zien hoe het werkt én ben je supersnel terug. Je zult straks zien als je je bal scant dat je naast de “wormhole” - aka de korte route - ook gewoon de volledige lange route kan nemen. De keuze is aan jou!
                                    </p>
                                    <p>
                                        Maar eerst gaan we het “antwoordpakketje” klaarmaken. Als je er klaar voor bent leg dan de bal op de scanner.
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
