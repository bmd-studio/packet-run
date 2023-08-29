import React, { useCallback, useState } from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus, useResetTerminalMutation, useScanNfcForTerminalMutation } from "@/data/generated";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RegisterTerminal from '@/components/RegisterTerminal';
import { useRouter } from 'next/router';
import NfcScanner from '@/components/NfcScanner';
import { styled } from 'styled-components';
import PacketInfo from '@/components/PacketInfo';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    height: 100vh;
`;

function ResetTerminal({ terminalId }: { terminalId: number }) {
    const [mutate] = useResetTerminalMutation();

    const handleClick = useCallback(() => {
        mutate({ variables: { terminalId }});
    }, [mutate, terminalId]);

    return (
        <Button onClick={handleClick}>Reset</Button>
    )
}

export default function Router() {
    return (
        <RegisterTerminal>
            {(terminal) => (
                <>
                    {terminal.status === TerminalStatus.ScanningNfc && (
                        <Grid>
                            <DestinationBar />
                            <div>
                                <ResetTerminal terminalId={terminal.id} />
                            </div>
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
