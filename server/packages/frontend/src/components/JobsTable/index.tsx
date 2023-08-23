import { useJobsSubscription } from "@/data/generated";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";


export default function JobsTable() {
    const { data } = useJobsSubscription();
    console.log(data);
    return (
        <div className="h-full">
            <Table className="h-full">
                <TableHeader className="sticky top-0 bg-gray-200">
                    <TableRow>
                        <TableHead>timestamp</TableHead>
                        <TableHead>id</TableHead>
                        <TableHead>type</TableHead>
                        <TableHead>data</TableHead>
                        <TableHead>status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="overflow-auto h-full">
                    {data?.jobs.sort((a, b) => b.timestamp - a.timestamp).map(job => {
                        return(
                            <TableRow key={`${job.timestamp}-${job.id}`}>
                                <TableHead>{new Date(job.timestamp).toLocaleTimeString()}</TableHead>
                                <TableHead>{job.id}</TableHead>
                                <TableHead>{job.name}</TableHead>
                                <TableHead>{job.data}</TableHead>
                                <TableHead>status</TableHead>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}