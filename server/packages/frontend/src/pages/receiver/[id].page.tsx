import Grid from '@/components/Grid';
import Map from '@/components/Map';
import PacketInfo from '@/components/PacketInfo';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal, { useTerminal } from '@/components/RegisterTerminal';
import { Title } from '@/components/Typography';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

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

const Banner = styled.h1`
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--dark-gray);
    padding: 24px 32px;
`;


function Browser() {
    const terminal = useTerminal();

    return (
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
    )
}

export default function Receiver() {
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
        <RegisterTerminal>
            {index === 0 && (
                <Browser />
            )}
            {index === 1 && (
                <Grid>
                    <Map />
                    <PacketInfo>
                        <Title>This is the route you&apos;ve travelled</Title>
                    </PacketInfo>
                </Grid>
            )}
            <Banner>Press [any key] to continue...</Banner>
        </RegisterTerminal>
    )
}