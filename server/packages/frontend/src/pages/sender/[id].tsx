import CreateRunWithNFC from '@/components/CreateRunWithNFC';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal from '@/components/RegisterTerminal';
import { DEBUG } from '@/config';
import { styled } from 'styled-components';
import WebsiteInput from '@/components/WebsiteInput';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import ScannerAnimation from '@/components/ScannerAnimation';

const Container = styled(PatternedBackground)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 32px;
`;

const Title = styled.h1`
    font-size: 80px;
`;

const Subtitle = styled.p`
    font-size: 32px;
`;



export default function Sender() {
    const { query } = useRouter();
    const host = useMemo(() => (
        query.host && !Array.isArray(query.host) ? query.host : null
    ), [query.host]);

    return(
        <RegisterTerminal>
            {DEBUG && <CreateRunWithNFC />}
            <Container>
                {host ? (
                    <>
                        <Title>Place your ball on the scanner...</Title>
                        <ScannerAnimation />
                    </>
                ) : (
                    <>
                        <Title>Welcome to Packet Run!</Title>
                        <Subtitle>Please enter the website you wish to navigate to...</Subtitle>
                        <WebsiteInput />
                    </>
                )}
            </Container>
        </RegisterTerminal>
    )
}