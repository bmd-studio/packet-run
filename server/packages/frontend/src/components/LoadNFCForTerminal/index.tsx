import { useResetTerminalMutation, useScanNfcForTerminalMutation } from '@/data/generated';
import { useTerminal } from '../RegisterTerminal';
import { useCallback, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

/**
 * This is a convenience component that allows setting the NFC ID using a form.
 * It should only be used when DEBUG is set to true.
 */
export default function LoadNFCForTerminal() {
    const terminal = useTerminal();

    const [ nfcId, setNfcId ] = useState<string>('');

    const [scanNfcForTerminal, { loading: loadingNfc }] = useScanNfcForTerminalMutation();
    const [resetTerminal, { loading: loadingIdle }] = useResetTerminalMutation();

    const handleSetNfc = useCallback(() => {
        scanNfcForTerminal({ variables: { terminalId: terminal.id, nfcId }});
        setNfcId('');
    }, [scanNfcForTerminal, terminal, nfcId]);

    const handleResetTerminal = useCallback(() => {
        resetTerminal({ variables: { terminalId: terminal.id }});
    }, [terminal, resetTerminal]); 

    if (loadingNfc || loadingIdle) {
        return (
            <Loader2 className="w-4 h-4 p-4 animate-spin" />
        )
    }

    console.log(terminal.run);

    return (
        <div className='p-4 max-w-sm absolute'>
            {!terminal.run ? (
                <form
                    className="flex gap-2 flex-col"
                    onSubmit={(e) => { e.preventDefault(); handleSetNfc(); }}
                >
                    <Input placeholder="NFC ID" onChange={(event) => setNfcId(event.target.value)} />
                    <Button onClick={handleSetNfc}>
                        Submit
                    </Button>
                </form>
            ) : (
                <form
                    className="flex gap-2 flex-col"
                    onSubmit={(e) => { e.preventDefault(); handleResetTerminal(); }}
                >
                    <Button onClick={handleResetTerminal}>
                        Reset
                    </Button>
                </form>
            )}
        </div>
    );
}