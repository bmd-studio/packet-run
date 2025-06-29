'use client';

import Grid from '@/components/Grid';
import RegisterTerminal from '@/components/RegisterTerminal';
import { Terminal, TerminalStatus, } from '@/data/generated';
import React from 'react';
import OffBoardingFlow from './startCarousel';
import EndCarousel from './scannedCarousel';
import useNFCLogic from '@/components/NFCScanLogic';



function Contents(props: { terminal: Terminal }) {
    const { terminal } = props;
    useNFCLogic();
    return (

        <Grid>
            {}
            {/* FIXME: @Lei what is the best way to reset the terminal over here? */}
            {terminal.status === TerminalStatus.ScanningNfc ? <EndCarousel resetCallback={() => {
                window.location.href = '/receiver/12'
            }} /> : (
                <OffBoardingFlow resetCallback={() => { }} />
                //<ReceiverView />
            )}
            {/* {MODE === 'standalone' && <LoadNFCForTerminal key="load-nfc" />} */}
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
