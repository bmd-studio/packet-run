

import { Terminal } from '@/data/generated';
import { styled } from 'styled-components';
import { useTerminal } from '@/components/RegisterTerminal';
import useNFCReader from '@/lib/useNFCReader';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScannerTimeoutBar from '../ScannerTimeoutBar';
import Label from '../Label';
import InstructionText, { selectInstructionType } from './text';
import PacketDescription, { PacketDescriptionProps } from '../PacketDescription';
import useNFCLogic from '../NFCScanLogic';


/** The amount of milliseconds between the scanner failing to detect an NFC tag
 * and the terminal being reset. */

const Container = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 360px;
    height: calc(100vh - 36px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    transform: translateX(-216px);
    z-index: 4; // Make sure it's in front of the element below
`;


const InstructionsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    gap: 32px;
    flex-grow: 1;
`;
const PacketInfoContainer = styled.div`
    position: relative;

`;

export interface PacketScannerProps {
    children?: React.ReactNode;
    animation?: PacketDescriptionProps['animation'];
    dark?: boolean;
}

export default function PacketScanner({ children, animation, dark }: PacketScannerProps) {
    const terminal = useTerminal();
    const nfcId = useNFCReader();

    const [scannerTimeout, error] = useNFCLogic(animation !== 'onboarding');

    const textType = useMemo(() => (
        selectInstructionType(terminal.type, terminal.status)
    ), [terminal.type, terminal.status]);

    return (
        <Container key="packet-scanner">
            {scannerTimeout && (
                <ScannerTimeoutBar start={scannerTimeout[0]} end={scannerTimeout[1]} />
            )}

            <InstructionsContainer>
                <Label>
                    INSTRUCTIES
                </Label>
                {children ||
                    <InstructionText type={textType} />
                }
            </InstructionsContainer>
            <PacketInfoContainer>
                <PacketDescription
                    terminal={terminal as unknown as Terminal}
                    error={!!error}
                    nfcId={nfcId || undefined}
                    dark={dark}
                    animation={animation}
                />

            </PacketInfoContainer>
        </Container>
    )
}
