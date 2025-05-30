'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { AnimatePresence } from 'framer-motion';
import PacketScanner from '@/components/PacketScanner';
import { TerminalStatus } from '@/data/generated';
import DestinationBar from '@/components/DestinationBar';
import Journey from '@/components/Journey';
import Map from '@/components/Map';
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
                                <PacketScanner />
                            </>
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && (
                            terminal.run?.currentHop.mayPerformTransformation ? (
                                <React.Fragment>
                                    <Centered>
                                        <Title>YOUR PACKET HAS ARRIVED AT</Title>
                                        <Title>{terminal.run?.url}</Title>
                                        <Title></Title>
                                        <Title>NOW, ANSWER THE REQUEST BY </Title>
                                        <Title>CREATING A RESPONSE PACKET.</Title>
                                    </Centered>
                                    <PacketScanner>
                                        <TextContainer>
                                            <Title>USE THE HANDLE TO</Title>
                                            <Title>FORGE A NEW PACKET</Title>
                                        </TextContainer>
                                        <ArrowWithLabel position="bottom-right" rotate={90}>HANDLE</ArrowWithLabel>
                                    </PacketScanner>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <DestinationBar />
                                    <Map />
                                    <Journey />
                                    <PacketScanner>
                                        <TextContainer>
                                            <Title>GUIDE YOUR</Title>
                                            <Title>PACKET ONWARDS</Title>
                                        </TextContainer>
                                    </PacketScanner>
                                </React.Fragment>
                            )
                        )}
                        {terminal.status === TerminalStatus.CreatingPacket && (
                            <React.Fragment>
                                <Centered>
                                    <Title>YOUR NEW PACKET</Title>
                                    <Title>HAS BEEN CREATED!</Title>
                                </Centered>
                                <PacketScanner>
                                    <Title>LIFT THE HANDLE</Title> 
                                </PacketScanner>
                            </React.Fragment>
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <React.Fragment>
                                <DestinationBar />
                                <Map />
                                <Journey />
                                <PacketScanner>
                                    <TextContainer>
                                        <Title>NOW, NAVIGATE BACK</Title>
                                        <Title>TO YOUR COMPUTER</Title>
                                    </TextContainer>
                                </PacketScanner>
                            </React.Fragment>
                        )}
                        <InfoBox />
                        <ForgeManager />
                    </AnimatePresence>
                </Grid>
            )}
        </RegisterTerminal>
    )
} 