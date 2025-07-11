import { styled } from 'styled-components';
import { Terminal, TerminalStatus, TerminalType } from '@/data/generated';
import Label from '../Label';
import ScannerAnimation, { ScannerVariant } from '../ScannerAnimation';
import { useMemo } from 'react';
import OnboardingAnimation from '../OnboardingAnimation';

const PacketDescriptionTextContainer = styled.div`
    background-color: var(--orange);
    width: 360px; 
    height: 104px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
`;

const PacketDescriptionContainer = styled.div`
    width: 360px; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: auto;
`;


const Text = styled.p`
    font-size: 24px;
    line-height: 34px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function selectAnimationType(terminalType: TerminalType, terminalStatus: TerminalStatus): ScannerVariant {
    if (terminalType !== TerminalType.Server) {
        if (terminalStatus === TerminalStatus.Idle) {
            return 'empty';
        }
        return 'scanned';
    }
    // else it has the type of SERVER
    if (terminalStatus === TerminalStatus.Idle) {
        return 'empty';
    }
    return 'pressing';
}

function selectText(nfcId: string | undefined, loading: boolean | undefined, error: boolean | undefined) {
    if (loading) {
        return 'Laden...';
    }
    if (error && nfcId) {
        return 'Ongeldig pakket gescand';
    }
    if (nfcId) {
        return 'Pakket gescand';
    }
    return 'Geen pakket gescand';
}

export interface PacketDescriptionProps {
    terminal: Terminal;
    error?: boolean;
    nfcId?: string;
    dark?: boolean;
    animation?: 'onboarding' | 'scanner';
    loading?: boolean;
}

export default function PacketDescription(props: PacketDescriptionProps) {
    const { terminal, error = false, nfcId, dark = false, animation = 'scanner', loading } = props;

    const animationType = useMemo(() => (
        selectAnimationType(terminal.type, terminal.status)
    ), [terminal.type, terminal.status]);

    const background = dark ? 'light' : 'dark';

    const url = useMemo(() => (
        terminal.run?.url
            ?.replace('https://', '')
            ?.replace('http://', '')
    ), [terminal.run?.url]);

    return (
        <PacketDescriptionContainer>
            {animation === 'onboarding' && (
                <OnboardingAnimation />
            )}
            {animation === 'scanner' && (
                <ScannerAnimation
                    variant={animationType}
                    background={background}
                />
            )}
            <PacketDescriptionTextContainer>
                {terminal.status === TerminalStatus.Idle && (
                    <Text>{selectText(nfcId, loading, error)}</Text>
                )}
                {terminal.run && (
                    terminal.status === TerminalStatus.ScanningNfc
                    || terminal.status === TerminalStatus.CreatingPacket
                    || terminal.status === TerminalStatus.CreatedPacket
                ) && (
                    <>
                        <div>
                            <Text>Verzoek voor website:</Text>
                            <Text>{url}</Text>
                        </div>
                    </>
                )}
            </PacketDescriptionTextContainer>
            <Label>
                SCANNER
            </Label>
        </PacketDescriptionContainer>
    );
}
