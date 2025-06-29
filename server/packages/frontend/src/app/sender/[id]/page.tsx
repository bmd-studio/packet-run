'use client';

import RegisterTerminal from '@/components/RegisterTerminal';
import { MODE } from '@/config';
import useNFCReader from '@/lib/useNFCReader';
import { useCreateRunMutation } from '@/data/generated';
import useHallSensor from '@/lib/useHallSensor';
import generateId from '@/lib/generateId';
import { useRouter } from 'next/navigation';
import OnBoardingFlow from './onboardingScreens';
import './index.css';
import { useCallback, useEffect, useState } from 'react';


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

    }, [nfcId, host, isPacketPressed, data, loading, createRunMutation, reset, setHost, router]);

    const resetCallback = useCallback(() => {
        reset();
        setHost(null);
    }, [reset, setHost]);

    return (
        <RegisterTerminal>
            {/* {MODE === 'standalone' && <CreateRunWithNFC />} */}
            <OnBoardingFlow setHost={setHost} ballPressed={isPacketPressed} ballPresent={!!nfcId} pressOpen={!isPacketPressed && data} resetCallback={resetCallback} />
        </RegisterTerminal>
    )
} 
