import { useTerminal } from '../RegisterTerminal';

export default function DebugBar() {
    const terminal = useTerminal();

    return (
        <div className="fixed bottom-4 right-4 border rounded-lg p-4 bg-background">
            <p>Terminal {terminal.id} ({terminal.type})</p>
            <p>Status: {terminal.status}</p>
        </div>
    );
}