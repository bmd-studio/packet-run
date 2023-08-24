import React, { useState } from 'react';
import DestinationBar from "@/components/DestinationBar";
import { useCreateRunMutation, useRegisterTerminalSubscription, useScanNfcForTerminalMutation } from "@/data/generated";
import { useRouter } from "next/router";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@apollo/client';

function TerminalSubscription({ terminalId }: {terminalId: number}) {
    useRegisterTerminalSubscription({
        variables: { id: terminalId },
    });
    return null;
}

function ScanNfc({ terminalId }: { terminalId: number}) {
    const [ nfcId, setNfcId ] = useState<string>('');

    const [scnNfc] = useScanNfcForTerminalMutation();

    const scanNfc = () => {
        scnNfc({
            variables: {
                terminalId: terminalId,
                nfcId: nfcId
            }
        })
    }

    return (
        <div className='flex gap-x-4'>
            <p>NFC ID:</p>
            <Input onChange={(event) => setNfcId(event.target.value)}></Input>
            <Button onClick={scanNfc}>
                    Submit
            </Button>
        </div>
    )
}

export default function Router() {
    const { query } = useRouter();
    const terminalId = parseFloat(query.id as string);
    

    if (!query.id) {
        return <div>No ID provided</div>;
    }

    return (
        <>
            <TerminalSubscription terminalId={terminalId} />
            <DestinationBar />
            <ScanNfc terminalId={terminalId}/>
        </>
    );
}
