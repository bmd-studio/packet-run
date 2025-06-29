'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { Terminal, TerminalStatus, useResetTerminalMutation, } from '@/data/generated';
import React, { useCallback } from 'react';
import OffBoardingFlow from './startCarousel';
import EndCarousel from './scannedCarousel';
import useNFCLogic from '@/components/NFCScanLogic';

function Contents(props: { terminal: Terminal }) {
    const { terminal } = props;
    useNFCLogic();

    const [resetTerminal] = useResetTerminalMutation();
    const reset = useCallback(() => { resetTerminal() }, [resetTerminal]);
    
    return (

        <Grid>
            {terminal.status === TerminalStatus.ScanningNfc ? <EndCarousel resetCallback={reset} /> : (
                <OffBoardingFlow />
            )}
        </Grid>
    );

}


export default function Receiver() {

    return (
        <RegisterTerminal>
            {(terminal) => (
                <Contents terminal={terminal as unknown as Terminal} />
            )}
        </RegisterTerminal>
    )
} 
