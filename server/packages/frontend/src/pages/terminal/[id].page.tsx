import { useGetTerminalTypeQuery } from '@/data/generated';
import { useRouter } from 'next/router';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

/**
 * This component should redirect a terminal to the right page given its
 * terminal type.
 */
export default function RedirectToRightTerminalPage() {
    const { query, push } = useRouter();
    const terminalId = parseInt(query.id as string);
    const { data, loading, error } = useGetTerminalTypeQuery({ variables: { terminalId }});

    // GUARD: Check if an error was encountered
    if (!terminalId || error) {
        return (
            <div className="w-screen h-screen flex">
                <Alert className="m-8 max-w-sm h-fit">
                    <AlertTitle>An error occurred while loading this terminal</AlertTitle>
                    <AlertDescription>
                        {!terminalId
                            ? 'The id for this terminal was not supplied or invalid.'
                            : <code>{error?.message}</code>
                        }
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // GUARD: Check whether we're loading or whether the dat ais not yet there
    if (loading || !data?.terminal) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
                <Loader2 className="w-16 h-16 animate-spin" />
            </div>
        );
    }

    // If all is right, redirect to the right page
    push(`/${data.terminal.type.toLowerCase()}/${terminalId}`);

    return null;
}