import { TerminalStatus, TerminalType } from '@/data/generated';
import { useMemo } from 'react';
import { styled } from 'styled-components';
const InstructionsTextContainer = styled.div`
    max-width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    & p {
      font-size: 40px;
      line-height: 40px;
      color: var(--white); 
      text-transform: none;
    }
`;
enum InstructionTextType {
    'explanationSender',
    'explanationGateway',
    'explanationRouter',
    'explanationServer',
    'wait',
    'pickRouter',
    'pressDown',
    'pressUp',
}

export function selectInstructionType(terminalType: TerminalType, terminalStatus: TerminalStatus) {
    switch (terminalStatus) {
        case TerminalStatus.ScanningNfc:
            switch (terminalType) {
                case TerminalType.Server:
                    return InstructionTextType.pressDown;
                default:
                    return InstructionTextType.pickRouter;
            }
            break;
        case TerminalStatus.CreatingPacket:
            return InstructionTextType.pressUp;
            break;
        case TerminalStatus.CreatedPacket:
            return InstructionTextType.pickRouter;
            break;
        case TerminalStatus.Idle:
            switch (terminalType) {
                case TerminalType.Sender:
                    return InstructionTextType.explanationSender;
                case TerminalType.Router:
                    return InstructionTextType.explanationRouter;
                case TerminalType.Gateway:
                    return InstructionTextType.explanationGateway;
                case TerminalType.Server:
                    return InstructionTextType.explanationServer;
            }
            break;
    }

    return InstructionTextType.wait;
}

function InstructionTextSelection(type: InstructionTextType) {
    const readExplanationText = 'Lees eerst links de uitleg';
    switch (type) {
        case InstructionTextType.explanationSender:
            return (
                <>
                    <p></p>
                </>
            );
            break;
        case InstructionTextType.explanationGateway:
            return (
                <>
                    <p>Welkom bij de internetpoort</p>
                    <p>{readExplanationText}</p>
                </>
            );
            break;
        case InstructionTextType.explanationRouter:
            return (
                <>
                    <p>Welkom bij de router</p>
                    <p>{readExplanationText}</p>
                </>
            );
            break;
        case InstructionTextType.explanationServer:
            return (
                <>
                    <p>Welkom bij de server</p>
                    <p>{readExplanationText}</p>
                </>
            );
            break;
        case InstructionTextType.wait:
            return (<p>Wacht tot de info van het pakket volledig geladen is. </p>);
            break;
        case InstructionTextType.pickRouter:
            return (
                <p>
                    Jij kiest de volgende route! Pak de bal, en werp die in één van de routes.
                </p>
            );
            break;
        case InstructionTextType.pressDown:
            return (
                <p>
                    Doe de hendel van de scanner DICHT. Zo maak je het antwoordpakket.
                </p>
            );
            break;
        case InstructionTextType.pressUp:
            return (
                <p>
                    Doe de hendel van de scanner OPEN.
                </p>
            );
            break;

    }
    return null;
}

export default function InstructionText(props: { type: InstructionTextType }) {
    const text = useMemo(() => (
        InstructionTextSelection(props.type)
    ), [props.type]);

    return (
        <InstructionsTextContainer>
            {text}
        </InstructionsTextContainer>
    );
}
