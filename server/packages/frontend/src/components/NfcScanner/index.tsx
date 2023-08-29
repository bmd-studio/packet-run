import { useScanNfcForTerminalMutation } from '@/data/generated';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import PatternedBackground from '../PatternedBackground';
import { styled } from 'styled-components';

const Container = styled(PatternedBackground)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 32px;
`;

export default function NfcScanner({ terminalId }: { terminalId: number }) {
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
        <Container className='flex gap-x-4 h-screen'>
            <h1>Place your packet on the scanner</h1>
            <div className="flex gap-2">
                <Input placeholder="NFC ID" onChange={(event) => setNfcId(event.target.value)} value={nfcId} />
                <Button onClick={handleSubmit}>
                        Submit
                </Button>
            </div>
        </Container>
    )
}
