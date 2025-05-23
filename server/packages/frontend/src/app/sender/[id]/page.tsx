'use client';

import CreateRunWithNFC from '@/components/CreateRunWithNFC';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal from '@/components/RegisterTerminal';
import { MODE } from '@/config';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import ScannerAnimation from '@/components/ScannerAnimation';
import useNFCReader from '@/lib/useNFCReader';
import { useCreateRunMutation } from '@/data/generated';
import useHallSensor from '@/lib/useHallSensor';
import WebsiteInput from '@/components/WebsiteInput';
import { TextContainer, Title, Subtitle } from '@/components/Typography';
import ArrowWithLabel from '@/components/ArrowWithLabel';
import generateId from '@/lib/generateId';
import { useRouter } from 'next/navigation';

const Container = styled(PatternedBackground)`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 64px;
`;

export default function Sender() {
    const router = useRouter();
    const nfcId = useNFCReader();
    const isPacketPressed = useHallSensor(!nfcId);
    const [createRunMutation, { loading, data, reset }] = useCreateRunMutation();
    const [host, setHost] = useState<null | string>(null);

    useEffect(() => {
        async function potentiallyCreateRun() {
            // GUARD: Check that the package is ready to be created
            if (host && !data?.createRun && !loading) {
                if (MODE === 'standalone') {
                    // In standalone mode, create a run immediately with a generated ID
                    const standaloneId = `standalone-${generateId(12)}`;
                    const result = await createRunMutation({ 
                        variables: { nfcId: standaloneId, url: `https://${host}` } 
                    });
                    
                    // GUARD: Check that the run was created
                    if (result.data?.createRun) {
                        // Redirect to the router page
                        router.push(`/gateway/2?nfcId=${standaloneId}`);
                    }
                } else if (nfcId && isPacketPressed) {
                    // In distributed mode, require NFC and packet press
                    createRunMutation({ variables: { nfcId, url: `https://${host}` } });
                }
            }

        }

        potentiallyCreateRun();

        // GUARD: Check that the packet is created and has been lifted from the scanner 
        if (data?.createRun && !nfcId) {
            const timeout = setTimeout(() => {
                reset();
                setHost(null);
            }, 25_000);

            return () => clearTimeout(timeout);
        }
    }, [nfcId, host, isPacketPressed, data, loading, createRunMutation, reset, setHost, router]);

    return(
        <RegisterTerminal>
            {/* {MODE === 'standalone' && <CreateRunWithNFC />} */}
            <Container>
                {!data?.createRun ? (
                    !host ? (
                        <>
                            <TextContainer>
                                <Title>WELCOME TO PACKET RUN!</Title>
                                <Subtitle>Which website would you like to visit today?</Subtitle>
                            </TextContainer>
                            <WebsiteInput onHost={setHost} />
                        </> 
                    ) : (
                        !nfcId ? (
                            <>
                                <Title>PLACE YOUR BALL ON THE SCANNER...</Title>
                                <Subtitle>Take a ball from the left and place it on the scanner</Subtitle>
                                <ScannerAnimation variant="empty" />
                                <ArrowWithLabel position='bottom-left'>BALL</ArrowWithLabel>
                                <ArrowWithLabel position='bottom-right'>SCANNER</ArrowWithLabel>
                            </>
                        ) : (
                            !loading ? (
                                <>
                                    <Title>NOW, WE&apos;RE GOING TO MAKE YOUR PACKET!</Title>
                                    <Subtitle>Take the handle and close the mold onto the packet...</Subtitle>
                                    <ScannerAnimation variant="scanned" />
                                    <ArrowWithLabel position='bottom-right'>PRESS</ArrowWithLabel>
                                </>
                            ) : (
                                <>
                                    <Title>YOUR PACKET IS BEING CREATED!</Title>
                                    <ScannerAnimation variant="scanned" />
                                </>
                            )
                        )
                    )
                ) : (
                    <>
                        <Title>YOUR PACKET HAS BEEN CREATED!</Title>
                        <Subtitle>Send your packet off on the right.</Subtitle>
                        <ArrowWithLabel position='top-right'>EXIT</ArrowWithLabel>
                    </>
                )}
            </Container>
        </RegisterTerminal>
    )
} 