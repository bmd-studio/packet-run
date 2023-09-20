import Grid from '@/components/Grid';
import Map from '@/components/Map';
import PacketInfo from '@/components/PacketInfo';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal, { useTerminal } from '@/components/RegisterTerminal';
import { Title } from '@/components/Typography';
import { TerminalStatus } from '@/data/generated';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NfcScanner from '@/pages/router/scanner';

const BrowserContainer = styled(PatternedBackground)`
    padding: 0 32px;
    width: 100vw;
    height: 100vh;
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
                <BrowserContainer>
                    <div>
                        <URLBar>{terminal.run?.url || 'https://moeilijkedingen.nl'}</URLBar>
                    </div>
                    <ImageContainer>
                        <Image
                            src={terminal.run?.imagePath || `http://${window.location.hostname}:8080/images/9nEJ2hwiUk8Q.png`}
                            alt="Website preview"
                        />
                    </ImageContainer>
                </BrowserContainer>
            )}
            {index === 1 && (
                <Grid>
                    <Map />
                    <PacketInfo>
                        <Title>This is the route you&apos;ve travelled</Title>
                    </PacketInfo>
                </Grid>
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
                    <NfcScanner terminalId={terminal.id} />
                    {terminal.status === TerminalStatus.ScanningNfc && (
                        <ReceiverView />
                    )}
                </Grid>
            )}
        </RegisterTerminal>
    )
}