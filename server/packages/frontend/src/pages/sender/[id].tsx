import CreateRunWithNFC from '@/components/CreateRunWithNFC';
import PatternedBackground from '@/components/PatternedBackground';
import RegisterTerminal from '@/components/RegisterTerminal';
import { DEBUG } from '@/config';
import { styled } from 'styled-components';
import WebsiteInput from '@/components/WebsiteInput';

const Container = styled(PatternedBackground)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 32px;
`;

const Title = styled.h1`
    font-size: 80px;
`;

const Subtitle = styled.p`
    font-size: 32px;
`;



export default function Sender() {
    return(
        <RegisterTerminal>
            {DEBUG && <CreateRunWithNFC />}
            <Container>
                <Title>Welcome to Packet Run!</Title>
                <Subtitle>Please enter the website you wish to navigate to...</Subtitle>
                <WebsiteInput />
            </Container>
        </RegisterTerminal>
    )
}