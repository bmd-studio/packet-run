import JobsTable from "@/components/JobsTable";
import StandaloneMenu from '@/components/StandaloneMenu';
import TerminalGraph from "@/components/TerminalGraph";

export default function Home() {
    return (
        <>
            <StandaloneMenu />
            <div className="flex flex-row h-screen p-4 gap-4 pt-17 bg-[var(--light-gray)]">
                <TerminalGraph />
                <JobsTable />
            </div>
        </>
    );
} 