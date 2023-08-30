import RegisterTerminal from '@/components/RegisterTerminal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateRunMutation } from "@/data/generated";
import { Loader2 } from 'lucide-react';
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
    return(
        <RegisterTerminal>
            <CreateRunWithNFC />
        </RegisterTerminal>
    )
}