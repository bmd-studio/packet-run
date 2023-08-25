import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateRunMutation, useRegisterTerminalSubscription } from "@/data/generated";
import { Loader, Loader2 } from 'lucide-react';
import { useCallback, useState } from "react";

function CreateRunWithNFC() {
    const [ nfcId, setNfcId ] = useState<string>('');
    const [ url, setUrl ] = useState<string>('');

    const [createRunMutation, { loading }] = useCreateRunMutation();

    const createRun = useCallback(async () => {
        await createRunMutation({
            variables: {
                url: url,
                nfcId: nfcId
            }
        });
        setNfcId("");
        setUrl("");
    }, [createRunMutation, setNfcId, setUrl, nfcId, url]);

    if (loading) {
        return (
            <Loader2 className="w-4 h-4 p-4 animate-spin" />
        )
    }

    return (
        <div className='flex gap-2 flex-col p-4 max-w-sm'>
            <Input placeholder="NFC ID" onChange={(event) => setNfcId(event.target.value)}></Input>
            <Input placeholder="URL" onChange={(event) => setUrl(event.target.value)}></Input>
            <Button onClick={createRun}>
                    Submit
            </Button>
        </div>
    )
}

export default function Sender() {
    const { data, loading, error } = useRegisterTerminalSubscription({ variables: { id: 1 }});
    
    if (error) {
        console.error(error);

        return (
            <div className="w-screen h-screen flex">
                <Alert className="m-8 max-w-sm h-fit">
                    <AlertTitle>An error occurred while loading this terminal</AlertTitle>
                    <AlertDescription>
                        <code>{error.message}</code>
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

    // const terminal = data.registerTerminal;

    return(
        <>
            <CreateRunWithNFC />
        </>
    )
}