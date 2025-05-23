import JobsTable from "@/components/JobsTable";
import TerminalGraph from "@/components/TerminalGraph";

export default function Home() {
    return (
        <div className="flex flex-row h-screen">
            <TerminalGraph />
            <JobsTable />
        </div>
    );
} 