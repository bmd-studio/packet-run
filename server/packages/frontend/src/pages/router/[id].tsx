import React from 'react';
import DestinationBar from "@/components/DestinationBar";
import { useRegisterTerminalSubscription } from "@/data/generated";
import { useRouter } from "next/router";

function TerminalSubscription({ id }: {id: number}) {
    useRegisterTerminalSubscription({
        variables: { id: id },
    });

    return null; // The Subscription component doesn't need to render anything
}

export default function Router() {
    const { query } = useRouter();
    const id = parseFloat(query.id as string);

    if (!query.id) {
        return <div>No ID provided</div>;
    }

    return (
        <>
            <TerminalSubscription id={id} />
            <DestinationBar />
            {/* input field with scan NFC */}
        </>
    );
}
