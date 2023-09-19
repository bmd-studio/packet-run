import CreateRunWithNFC from '@/components/CreateRunWithNFC';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal from '@/components/RegisterTerminal';
import { DEBUG } from '@/config';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import ScannerAnimation from '@/components/ScannerAnimation';
import useNFCReader from '@/lib/useNFCReader';
import { useCreateRunMutation } from '@/data/generated';
import useHallSensor from '@/lib/useHallSensor';
import WebsiteInput from '@/components/WebsiteInput';

export const Container = styled(PatternedBackground)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 64px;
`;

export const Title = styled.h1`
    font-size: 80px;
`;

export const Subtitle = styled.h2`
    font-size: 40px;
    font-weight: 400;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export default function Sender() {
    const nfcId = useNFCReader();
    const isPacketPressed = useHallSensor();
    const [createRunMutation, { loading, data, reset }] = useCreateRunMutation();
    const [host, setHost] = useState<null | string>(null);

    useEffect(() => {
        // GUARD: Check that the package is ready to be created
        if (nfcId && host && isPacketPressed && !data?.createRun && !loading) {
            createRunMutation({ variables: { nfcId, url: `https://${host}` } });
        }

        // GUARD: Check that the packet is created and has been lifted from the scanner 
        if (data?.createRun && !nfcId) {
            const timeout = setTimeout(() => {
                reset();
                setHost(null);
            }, 25_000);

            return () => clearTimeout(timeout);
        }
    }, [nfcId, host, isPacketPressed, data, loading, createRunMutation, reset, setHost]);

    return(
        <RegisterTerminal>
            {DEBUG && <CreateRunWithNFC />}
            <Container>
                {!data?.createRun ? (
                    !nfcId ? (
                        !host ? (
                            <>
                                <TextContainer>
                                    <Title>Welcome to Packet Run!</Title>
                                    <Subtitle>Which website would you like to visit today?</Subtitle>
                                </TextContainer>
                                <WebsiteInput onHost={setHost} />
                            </>
                        ) : (
                            <>
                                <Title>Place your ball on the scanner...</Title>
                                <ScannerAnimation />
                            </>
                        )
                    ) : (
                        !loading ? (
                            <>
                                <Title>Now, we&apos;re going to make your packet!</Title>
                                <Subtitle>Take the handle and close the mold onto the packet...</Subtitle>
                                <ScannerAnimation />
                            </>
                        ) : (
                            <>
                                <Title>Your packet is being forged!</Title>
                                <ScannerAnimation />
                            </>
                        )
                    )
                ) : (
                    <>
                        <Title>Your packet has been created!</Title>
                        <Subtitle>Send your packet off on the right.</Subtitle>
                    </>
                )}
            </Container>
        </RegisterTerminal>
    )
}