import DestinationBar from "@/components/DestinationBar";
import { useRouter } from "next/router";

export default function Router() {
    const { query } = useRouter();
    const id = query.id;
    console.log('Query:', query);
    console.log('ID:', id);
    // register terminal

    return(
        <>
            <DestinationBar />
            {/* input field with scan NFC */}
        </>
    )
}