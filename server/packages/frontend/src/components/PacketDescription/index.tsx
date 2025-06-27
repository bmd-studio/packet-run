import { styled } from 'styled-components';
import { Terminal, TerminalStatus, TerminalType } from '@/data/generated';
import { usePathname } from 'next/navigation';
import Label from '../Label';
import ScannerAnimation, { ScannerVariant } from '../ScannerAnimation';
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
export default function PacketDescription(props: { terminal: Terminal, error?: boolean, nfcId?: string }) {
    const { terminal, error = false, nfcId } = props;
    const animationType = selectAnimationType(terminal.type, terminal.status);
    const pathname = usePathname();
    const isLightBackground = pathname.includes('sender') || pathname.includes('receiver');
    const background = isLightBackground ? 'light' : 'dark';
    // Here include whether in Sender or not
    const isOnboardingAnimation = pathname.includes('sender');

    return (
        <PacketDescriptionContainer>
            {isOnboardingAnimation ? (
                <OnboardingAnimation />
                ) : (
                <ScannerAnimation
                    variant={animationType}
                    background={background}
                />
                )
            }
            <PacketDescriptionTextContainer>
                {terminal.status === TerminalStatus.Idle && (
                    error && nfcId ? (
                        <Text>Ongeldig pakket gescand</Text>
                    ) : (
                        <Text>Geen pakket gescand</Text>
                    )
                )}
                {terminal.run && (
                    terminal.status === TerminalStatus.ScanningNfc
                    || terminal.status === TerminalStatus.CreatingPacket
                    || terminal.status === TerminalStatus.CreatedPacket
                ) && (
                    <>
                        <div>
                            <Text>Verzoek voor website:</Text>
                            <Text>{terminal.run.url}</Text>
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
