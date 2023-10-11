import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTerminal } from '../RegisterTerminal';
import { TerminalStatus, TerminalType } from '@/data/generated';
import { PropsWithChildren, ReactNode } from 'react';
import { sample } from 'lodash';

const Container = styled.div`
    grid-area: main;
    position: relative;
`;

const Box = styled(motion.div)` 
    position: absolute;
    bottom: 0;
    right: 0;

    width: 20vw;
    margin: 24px;
    padding: 16px;
    
    background-color: var(--yellow);
    color: black;
    box-shadow: 8px 8px 0px black;

    display: flex;
    gap: 16px;
    
    font-weight: 500;
`;

const Question = styled.img`
    margin-top: 4px;
    width: 24px;
    height: 24px;
`;

export function InfoBoxWrapper({ children }: PropsWithChildren) {
    return (
        <Container>
            <Box
                initial={{ translateY: '150%' }}
                animate={{ translateY: '0%' }}
                transition={{ duration: 0.5, delay: 3 }}
            >
                <Question src="/help.png" />
                <span>{children}</span>
            </Box>
        </Container>
    );
}

export default function InfoBox() {
    const terminal = useTerminal();

    console.log(terminal.run?.currentHopIndex);

    if (terminal.type === TerminalType.Server
        && terminal.status === TerminalStatus.CreatedPacket
    ) {
        return (
            <InfoBoxWrapper>
                Normally speaking, a response packet must find its way back to your computer as usual. 
                For your convenience, we&apos;ve added the <span style={{ fontWeight: 800 }}>Wormhole</span>. It will transport you right back to your home network.
            </InfoBoxWrapper>
        );
    }

    if (terminal.type === TerminalType.Gateway
        && terminal.run?.currentHopIndex === 3
        && terminal.status === TerminalStatus.ScanningNfc
    ) {
        return (
            <InfoBoxWrapper>
                You&apos;re currently at the first router. This router will connect you to the rest of the internet!
            </InfoBoxWrapper>
        );
    }

    if (terminal.type === TerminalType.Router
        && terminal.status === TerminalStatus.ScanningNfc
    ) {
        const facts: ReactNode[] = [
            'Any router along can see the origin, destination and website you\'re visiting in the packet. Most other contents are secret nowadays, thanks to encryption.',
            // Source: https://httparchive.org/reports/state-of-the-web#pctHttps
            'You need to send about 70 request packets in order to display the average website.',
            'The average website returns about 4000 response packets before the website can be displayed.',
            'Your packet is about 98% data and about 2% headers. The headers make up the addressing information that helps the routers transfer your packet.',
            'A router only takes a couple microseconds to process a single packet.',
            'Your packet nearly all of its time being transmitted as light particles across glass fiber cables.'
        ];

        if (terminal.run?.currentHopIndex) {
            facts.push(`So far, you've burned about ${(terminal.run?.currentHopIndex * 5 * (70 / 1000)).toFixed(2)} kcal routing this packet.`)
        }

        return (
            <InfoBoxWrapper>
                {sample(facts)}
            </InfoBoxWrapper>
        );
    }

    return null;
}