import { JobStatus, useJobsSubscription } from "@/data/generated";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import colors from 'tailwindcss/colors';
import { Loader2 } from 'lucide-react';

const mapJobStatusToColor: Record<JobStatus, { background: string, text: string }> = {
    [JobStatus.Failed]: {
        text: colors.red[600],
        background: colors.red[100],
    },
    [JobStatus.Completed]: {
        text: colors.green[600],
        background: colors.green[100],
    },
    [JobStatus.Active]: {
        text: colors.blue[600],
        background: colors.blue[100],
    },
    [JobStatus.Waiting]: {
        text: colors.indigo[600],
        background: colors.indigo[100],
    },
    [JobStatus.Delayed]: {
        text: colors.purple[600],
        background: colors.purple[100],
    },
    [JobStatus.Other]: {
        text: colors.gray[600],
        background: colors.gray[100],
    },
};


export default function JobsTable() {
    const { data, error } = useJobsSubscription();

    if (error) {
        console.error(error);
    }

    return (
        <div className="h-full border-l">
            <Table className="border-b">
                <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Id</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Error</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="overflow-auto">
                    {data?.jobs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).map(job => {
                        return(
                            <TableRow key={`${job.timestamp}-${job.id}`}>
                                <TableCell>{job.timestamp && new Date(job.timestamp).toLocaleTimeString()}</TableCell>
                                <TableCell>{job.id}</TableCell>
                                <TableCell>{job.name}</TableCell>
                                <TableCell>{job.data}</TableCell>
                                <TableCell>
                                    <span
                                        className="text-sm font-bold p-1 px-2 rounded flex items-center gap-1 basis-0"
                                        style={{
                                            backgroundColor: mapJobStatusToColor[job.status].background,
                                            color: mapJobStatusToColor[job.status].text,
                                        }}
                                    >
                                        {job.status}
                                        {job.status === JobStatus.Active ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : null}
                                    </span>
                                </TableCell>
                                <TableCell className="w-[256px]">
                                    <TooltipProvider>
                                        <Tooltip delayDuration={0} >
                                            <TooltipTrigger>
                                                <div className="truncate w-[256px] max-w-[256px]">
                                                    {job.failedReason}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="w-[256px]">
                                                <p>{job.failedReason}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}