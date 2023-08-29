import React, { useCallback, useState } from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus, useResetTerminalMutation, useScanNfcForTerminalMutation } from "@/data/generated";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RegisterTerminal from '@/components/RegisterTerminal';
import { useRouter } from 'next/router';

function NfcScanner({ terminalId }: { terminalId: number }) {
    const { query } = useRouter();
    const [ nfcId, setNfcId ] = useState<string>(query.nfcId && !Array.isArray(query.nfcId) ? query.nfcId : '');
    const [mutate] = useScanNfcForTerminalMutation();

    const handleSubmit = () => {
        mutate({
            variables: {
                terminalId: terminalId,
                nfcId: nfcId
            }
        })
    }

    return (
        <div className='flex gap-x-4'>
            <Input placeholder="NFC ID" onChange={(event) => setNfcId(event.target.value)} value={nfcId} />
            <Button onClick={handleSubmit}>
                    Submit
            </Button>
        </div>
    )
}

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
                        <>
                            <DestinationBar />
                            <ResetTerminal terminalId={terminal.id} />
                        </>
                    )}
                    {terminal.status === TerminalStatus.Idle && (
                        <NfcScanner terminalId={terminal.id}/>
                    )}
                </>
            )}
        </RegisterTerminal>
    );
}
