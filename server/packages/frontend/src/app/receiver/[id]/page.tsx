'use client';

import Grid from '@/components/Grid';
import Map from '@/components/Map';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal, { useTerminal } from '@/components/RegisterTerminal';
import { Subtitle, TextContainer, Title } from '@/components/Typography';
import { TerminalStatus } from '@/data/generated';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NfcScanner from '@/components/PacketScanner';
import { BACKEND_URL, MODE } from '@/config';
import LoadNFCForTerminal from '@/components/LoadNFCForTerminal';
import ArrowWithLabel from '@/components/ArrowWithLabel';
import React from 'react';

const BrowserContainer = styled(PatternedBackground)`
    padding: 0 32px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const URLBar = styled.h3`
    background-color: var(--light-gray);
    padding: 32px;
    font-size: 32px;
    line-height: 24px;
    display: inline-flex;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top center;
    background-color: var(--light-gray);
`;

const ImageContainer = styled.div`
    flex: 1 1 0px;
    min-height: 0px;
`;

const Banner = styled(motion.h1)`
    position: fixed;
    bottom: 24px;
    left: 50%;
    background-color: var(--dark-gray);
    padding: 24px 32px;
    color: white;
`;

const Centered = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

function ReceiverView() {
    const terminal = useTerminal();

    const [index, setIndex] = useState(0);

    const next = useCallback(() => {
        setIndex((i) => i + 1);
    }, []);

    useEffect(() => {
        function listener() {
            next();
        }

        document.addEventListener('keydown', listener);

        return () => document.removeEventListener('keydown', listener);
    }, [next]);

    return (
        <>
            {index === 0 && (
                <React.Fragment key="browser-view">
                    <BrowserContainer>
                        <div>
                            <URLBar>{terminal.run?.url || 'https://moeilijkedingen.nl'}</URLBar>
                        </div>
                        <ImageContainer>
                            <Image alt="Browser screen" src={`${BACKEND_URL}/${terminal.run?.imagePath}`} />
                        </ImageContainer>
                    </BrowserContainer>
                </React.Fragment>
            )}
            {index === 1 && (
                <React.Fragment key="map-view">
                    <Map />
                </React.Fragment>
            )}
            {index === 2 && (
                <React.Fragment key="thanks-view">
                    <Centered>
                        <TextContainer>
                            <Title>THANKS FOR TAKING A</Title>
                            <Title>RIDE WITH PACKET RUN!</Title>
                            <Subtitle>Before you leave, please deposit your</Subtitle>
                            <Subtitle>packet in the top right corner. Thanks :)</Subtitle>
                        </TextContainer>
                    </Centered>
                    <ArrowWithLabel position="top-right">DEPOSIT BALL</ArrowWithLabel>
                </React.Fragment>
            )}
            <Banner
                initial={{ x: '-50%', y: 400 }}
                animate={{ x: '-50%', y: 0 }}
                transition={{ delay: 5 }}
            >
                Press [any key] to continue...
            </Banner>
        </>
    )
}

export default function Receiver() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <Grid>
                    <NfcScanner><></></NfcScanner>
                    {terminal.status === TerminalStatus.ScanningNfc && (
                        <ReceiverView />
                    )}
                    {/* {MODE === 'standalone' && <LoadNFCForTerminal key="load-nfc" />} */}
                </Grid>
            )}
        </RegisterTerminal>
    )
} 