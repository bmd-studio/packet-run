'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { Terminal, TerminalStatus, } from '@/data/generated';
import React from 'react';
import OffBoardingFlow from './startCarousel';
import EndCarousel from './scannedCarousel';
import useNFCLogic from '@/components/NFCScanLogic';
import ScannerTimeoutBar from '@/components/ScannerTimeoutBar';

function Contents(props: { terminal: Terminal }) {
    const { terminal } = props;
    const { scannerTimeout } = useNFCLogic();
    
    return (
        <Grid>
            {terminal.status === TerminalStatus.ScanningNfc
                ? <EndCarousel /> 
                : <OffBoardingFlow />
            }
            {scannerTimeout && (
                <ScannerTimeoutBar
                    start={scannerTimeout[0]}
                    end={scannerTimeout[1]}
                />
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
