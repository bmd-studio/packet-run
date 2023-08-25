import React, { useCallback, useState } from 'react';
import DestinationBar from "@/components/DestinationBar";
import { TerminalStatus, useRegisterTerminalSubscription, useResetTerminalMutation, useScanNfcForTerminalMutation } from "@/data/generated";
import { useRouter } from "next/router";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';

function NfcScanner({ terminalId }: { terminalId: number }) {
    const [ nfcId, setNfcId ] = useState<string>('');

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
            <Input placeholder="NFC ID" onChange={(event) => setNfcId(event.target.value)}></Input>
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
    const { query } = useRouter();
    const terminalId = parseInt(query.id as string);
    const { data, loading, error } = useRegisterTerminalSubscription({ variables: { id: terminalId }, skip: !terminalId });
    
    if (error) {
        console.error(error);
    }

    if (!terminalId || error) {
        return (
            <div className="w-screen h-screen flex">
                <Alert className="m-8 max-w-sm h-fit">
                    <AlertTitle>An error occurred while loading this terminal</AlertTitle>
                    <AlertDescription>
                        {!terminalId
                            ? 'The id for this terminal was not supplied or invalid.'
                            : <code>{error?.message}</code>
                        }
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (loading || !data?.registerTerminal) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
                <Loader2 className="w-16 h-16 animate-spin" />
            </div>
        );
    }

    const terminal = data.registerTerminal;

    return (
        <>
            <div>Terminal {terminal.id}</div>
            {terminal.status === TerminalStatus.ScanningNfc && (
                <>
                    <DestinationBar />
                    <ResetTerminal terminalId={terminal.id} />
                </>
            )}
            {terminal.status === TerminalStatus.Idle && (
                <NfcScanner terminalId={terminalId}/>
            )}
        </>
    );
}
