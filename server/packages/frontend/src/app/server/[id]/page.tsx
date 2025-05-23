'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { AnimatePresence } from 'framer-motion';
import PacketScanner from '@/components/PacketScanner';
import { TerminalStatus } from '@/data/generated';
import DestinationBar from '@/components/DestinationBar';
import Journey from '@/components/Journey';
import Map from '@/components/Map';
import LoadNFCForTerminal from '@/components/LoadNFCForTerminal';
import { MODE } from '@/config';
import { TextContainer, Title } from '@/components/Typography';
import ForgeManager from './manager';
import styled from 'styled-components';
import ArrowWithLabel from '@/components/ArrowWithLabel';
import InfoBox from '@/components/InfoBox';
import React from 'react';

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 128px;
    gap: 8px;
`;

export default function Server() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <AnimatePresence>
                        {terminal.status === TerminalStatus.Idle && (
                            <>
                                <PacketScanner key="packet-scanner" />
                            </>
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && (
                            <React.Fragment key="scanning-nfc-content">
                                <DestinationBar key="destination-bar" />
                                <Map key="map" />
                                <Journey key="journey" />
                                <PacketScanner key="packet-scanner">
                                    <TextContainer>
                                        <Title>GUIDE YOUR</Title>
                                        <Title>PACKET ONWARDS</Title>
                                    </TextContainer>
                                </PacketScanner>
                            </React.Fragment>
                        )}
                        {terminal.status === TerminalStatus.CreatingPacket && (
                            <React.Fragment key="creating-packet-content">
                                <Centered key="centered">
                                    <Title>YOUR NEW PACKET</Title>
                                    <Title>HAS BEEN CREATED!</Title>
                                </Centered>
                                <PacketScanner key="packet-scanner">
                                    <Title>LIFT THE HANDLE</Title> 
                                </PacketScanner>
                            </React.Fragment>
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <React.Fragment key="created-packet-content">
                                <DestinationBar key="destination-bar" />
                                <Map key="map" />
                                <Journey key="journey" />
                                <PacketScanner key="packet-scanner">
                                    <TextContainer>
                                        <Title>NOW, NAVIGATE BACK</Title>
                                        <Title>TO YOUR COMPUTER</Title>
                                    </TextContainer>
                                </PacketScanner>
                            </React.Fragment>
                        )}
                        {MODE === 'standalone' && <LoadNFCForTerminal key="load-nfc" />}
                        <InfoBox />
                        <ForgeManager key="forge-manager" />
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    )
} 