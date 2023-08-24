import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateRunMutation } from "@/data/generated";
import { useState } from "react";

function CreateRunWithNFC() {
    const [ nfcId, setNfcId ] = useState<string>('');
    const [ url, setUrl ] = useState<string>('');

    const [createRunMutation] = useCreateRunMutation();

    const createRun = () => {
        createRunMutation({
            variables: {
                url: url,
                nfcId: nfcId
            }
        })
    }

    return (
        <div className='flex gap-x-4'>
            <p>NFC ID:</p>
            <Input onChange={(event) => setNfcId(event.target.value)}></Input>
            <p>url:</p>
            <Input onChange={(event) => setUrl(event.target.value)}></Input>
            <Button onClick={createRun}>
                    Submit
            </Button>
        </div>
    )
}

export default function Sender() {
    return(
        <>
            <CreateRunWithNFC />
        </>
    )
}