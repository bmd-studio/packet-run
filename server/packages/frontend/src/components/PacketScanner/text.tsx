import { Terminal, TerminalStatus, TerminalType } from '@/data/generated';
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
    'explanationGateway',
    'explanationRouter',
    'explanationServer',
    'wait',
    'pickRouter',
    'press',
}

export function selectInstructionType(terminalType: TerminalType, terminalStatus: TerminalStatus) {
    let textType = InstructionTextType.explanationRouter;
    switch (terminalType) {
        case TerminalType.Router:
            textType = InstructionTextType.explanationRouter;
            break;
        case TerminalType.Gateway:
            textType = InstructionTextType.explanationGateway;
            break;
        case TerminalType.Server:
            textType = InstructionTextType.explanationServer;
            break;
    }
    if (terminalStatus === TerminalStatus.ScanningNfc) {
        textType = InstructionTextType.pickRouter;
    }
    if (terminalStatus === TerminalStatus.ScanningNfc && terminalType === TerminalType.Server) {
        textType = InstructionTextType.press;
    }
    return textType;

}

function InstructionTextSelection(type: InstructionTextType) {
    const readExplanationText = 'Lees eerst links de uitleg';
    switch (type) {
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
        case InstructionTextType.press:
            return (
                <p>
                    Doe de hendel van de scanner DICHT en weer OPEN. Zo maak je het antwoord pakket.
                </p>
            );
            break;

    }
    return null;
}

export default function InstructionText(props: { type: InstructionTextType }) {
    return (
        <InstructionsTextContainer>
            {InstructionTextSelection(props.type)}
        </InstructionsTextContainer>
    );
}
