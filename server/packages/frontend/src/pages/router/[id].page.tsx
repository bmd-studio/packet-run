import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus } from "@/data/generated";
import RegisterTerminal from '@/components/RegisterTerminal';
import NfcScanner from '@/components/NfcScanner';
import { styled } from 'styled-components';
import PacketInfo from '@/components/PacketInfo';
import Map from '@/components/Map';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    height: 100vh;
`;

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <>
                    {terminal.status === TerminalStatus.ScanningNfc && (
                        <Grid>
                            <DestinationBar />
                            <Map />
                            <PacketInfo />
                        </Grid>
                    )}
                    {terminal.status === TerminalStatus.Idle && (
                        <NfcScanner terminalId={terminal.id}/>
                    )}
                </>
            )}
        </RegisterTerminal>
    );
}
