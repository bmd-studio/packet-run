import { styled } from 'styled-components';
import PatternedBackground from '../PatternedBackground';
import { useTerminal } from '../RegisterTerminal';

const Container = styled(PatternedBackground)`
    width: 40vw;
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content:  flex-end;
    align-items: center;
`;

const InnerContainer = styled.div`
    width: 360px;
    gap: 64px;
    display: flex;
    flex-direction: column;
`;

const Card = styled.div`
    background-color: var(--light-gray);
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Label = styled.p`

`;

const Text = styled.h2`
    font-size: 30px;
    line-height: 28px;
`;

const Title = styled.h1`
    font-size: 64px;
    line-height: 44px;
`;

export default function PacketInfo() {
    const { run } = useTerminal();

    if (!run) {
        return null;
    }

    return (
        <Container>
            <InnerContainer>
                <Title>Send your packet to <br />the next destination</Title>
                <Card>
                    <div>
                        <Label>Packet ID</Label>
                        <Text>{run.id}</Text>
                    </div>
                    {/* <div>
                        <Label>Owner</Label>
                        <Text>BMD Studio</Text>
                    </div> */}
                    <div>
                        <Label>Source IP address</Label>
                        <Text>{run.origin?.ip || '???'}</Text>
                    </div>
                    <div>
                        <Label>Destination IP address</Label>
                        <Text>{run.destination?.ip || '???'}</Text>
                    </div>
                </Card>
            </InnerContainer>
        </Container>
    );
}