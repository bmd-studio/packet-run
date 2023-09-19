import CreateRunWithNFC from '@/components/CreateRunWithNFC';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal from '@/components/RegisterTerminal';
import { DEBUG } from '@/config';
import { styled } from 'styled-components';
import WebsiteInput from '@/components/WebsiteInput';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import ScannerAnimation from '@/components/ScannerAnimation';
import useNFCReader from '@/lib/useNFCReader';
import { Button } from '@/components/ui/button';
import { useCreateRunMutation } from '@/data/generated';
import { Loader2 } from 'lucide-react';

const Container = styled(PatternedBackground)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 64px;
`;

const Title = styled.h1`
    font-size: 80px;
`;

const Subtitle = styled.h2`
    font-size: 40px;
    font-weight: 400;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export default function Sender() {
    const { query, replace } = useRouter();
    const host = useMemo(() => (
        query.host && !Array.isArray(query.host) ? query.host : null
    ), [query.host]);
    const nfcId = useNFCReader();
    const [createRunMutation, { loading }] = useCreateRunMutation();

    const handleCreatePacket = useCallback(async () => {
        if (nfcId && host) {
            await createRunMutation({ variables: { nfcId, url: `https://${host}`} });
            replace({ query: { id: query.id } });
        }
    }, [nfcId, host, createRunMutation, replace, query]);

    return(
        <RegisterTerminal>
            {DEBUG && <CreateRunWithNFC />}
            <Container>
                {host ? (
                    nfcId ? (
                        <>
                            <Title>Create your packet</Title>
                            <Button onClick={handleCreatePacket} disabled={loading}>
                                CREATE PACKET
                                {loading && (<Loader2 className="w-4 h-4 animate-spin" />)}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Title>Place your ball on the scanner...</Title>
                            <ScannerAnimation />
                        </>
                    )
                ) : (
                    <>
                        <TextContainer>
                            <Title>Welcome to Packet Run!</Title>
                            <Subtitle>Which website would you like to visit today?</Subtitle>
                        </TextContainer>
                        <WebsiteInput />
                    </>
                )}
            </Container>
        </RegisterTerminal>
    )
}