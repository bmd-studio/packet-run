'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { AnimatePresence, motion } from 'framer-motion';
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

const Centered = styled(motion.div)`
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
                            <PacketScanner />
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && terminal.run?.currentHop.mayPerformTransformation && (
                            <Centered key="creating-packet">
                                <Title>YOUR PACKET HAS ARRIVED AT</Title>
                                <Title>{terminal.run?.url}</Title>
                                <Title></Title>
                                <Title>NOW, ANSWER THE REQUEST BY </Title>
                                <Title>CREATING A RESPONSE PACKET.</Title>
                            </Centered>
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && terminal.run?.currentHop.mayPerformTransformation && (
                            <PacketScanner>
                                <TextContainer>
                                    <Title>USE THE HANDLE TO</Title>
                                    <Title>FORGE A NEW PACKET</Title>
                                </TextContainer>
                                <ArrowWithLabel position="bottom-right" rotate={90}>HANDLE</ArrowWithLabel>
                            </PacketScanner>
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && !terminal.run?.currentHop.mayPerformTransformation && (
                            <DestinationBar />
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && !terminal.run?.currentHop.mayPerformTransformation && (
                            <Map />
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && !terminal.run?.currentHop.mayPerformTransformation && (
                            <Journey />
                        )}
                        {terminal.status === TerminalStatus.ScanningNfc && !terminal.run?.currentHop.mayPerformTransformation && (
                            <PacketScanner>
                                <TextContainer>
                                    <Title>GUIDE YOUR</Title>
                                    <Title>PACKET ONWARDS</Title>
                                </TextContainer>
                            </PacketScanner>
                        )}
                        {terminal.status === TerminalStatus.CreatingPacket && (
                            <Centered key="created-packet">
                                <Title>YOUR NEW PACKET</Title>
                                <Title>HAS BEEN CREATED!</Title>
                            </Centered>
                        )}
                        {terminal.status === TerminalStatus.CreatingPacket && (
                            <PacketScanner>
                                <Title>LIFT THE HANDLE</Title> 
                            </PacketScanner>
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <DestinationBar />
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <Map />
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <Journey />
                        )}
                        {terminal.status === TerminalStatus.CreatedPacket && (
                            <PacketScanner>
                                <TextContainer>
                                    <Title>NOW, NAVIGATE BACK</Title>
                                    <Title>TO YOUR COMPUTER</Title>
                                </TextContainer>
                            </PacketScanner>
                        )}
                        <InfoBox key="info-box" />
                    </AnimatePresence>
                    <ForgeManager />
                </Grid>
            )}
        </RegisterTerminal>
    )
} 