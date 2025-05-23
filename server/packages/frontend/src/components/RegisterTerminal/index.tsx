'use client';
import { RegisterTerminalSubscription, useRegisterTerminalSubscription } from '@/data/generated';
import { Loader2 } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import dynamic from 'next/dynamic';
import { DEBUG } from '@/config';

export const terminalContext = createContext<RegisterTerminalSubscription['registerTerminal']>(undefined);

export type TerminalSubscriptionData = NonNullable<RegisterTerminalSubscription['registerTerminal']>;

/**
 * Retrieve some data from the terminal subscription
 */
export function useTerminal<T = TerminalSubscriptionData>(
    memoFunction: (t: TerminalSubscriptionData) => T = (t) => t as T,
): T {
    // Retrieve the terminal from the context
    const terminal = useContext(terminalContext) ;

    // GUARD: Ensure that the hook is only called when a descendant of `RegisterTerminal`
    if (!terminal) {
        throw new Error('Could not find registered terminal. Have you put the `RegisterTerminal` component at the root of your page?');
    }

    // Then, use the function and memoize the output
    return useMemo((
        () => memoFunction(terminal as unknown as TerminalSubscriptionData)
    ), [memoFunction, terminal]);
}


/**
 * A dynamic wrapper that only loads the debug bar when the NEXTJS_PUBLIC_DEBUG
 * environment variable is set to true.
 */
export const DynamicDebugBar = DEBUG
    ? dynamic(() => import('@/components/DebugBar'))
    : () => null;

export type RegisterTerminalProps = PropsWithChildren | { children: ((data: TerminalSubscriptionData) => ReactNode | undefined) };

/**
 * This component will register a particular terminal subscription and make all
 * data available via the React context. It will display loading screens and
 * error messages in case the registration fails.
 * Retrieve the data using the `useTerminal` function, the render props API or
 * using the context.
 */
export default function RegisterTerminal({ children }: RegisterTerminalProps) {
    const { push } = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const terminalId = parseInt(params.id as string);
    const pageSlug = useMemo(() => pathname.split('/')[1], [pathname]);
    const { data, loading, error } = useRegisterTerminalSubscription({ variables: { id: terminalId }, skip: !terminalId });
    
    if (error) {
        console.error(error, error.graphQLErrors, data);
    }

    // Reload the page whenever an error is encountered
    useEffect(() => {
        if (!error) return;

        const timeout = setTimeout(() => {
            window.location.reload();
        }, 30_000);

        return () => clearTimeout(timeout);
    }, [error]);

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
    if (loading || !data?.registerTerminal) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
                <Loader2 className="w-16 h-16 animate-spin" />
            </div>
        );
    }

    // GUARD: Verify that we're on the right type of page for this terminal type
    if (pageSlug !== data.registerTerminal.type.toLowerCase()) {
        push(`/${data.registerTerminal.type.toLowerCase()}/${terminalId}`);
        return null;
    }
    
    return (
        <terminalContext.Provider value={data.registerTerminal}>
            {typeof children === 'function'
                ? children(data.registerTerminal)
                : children
            }
            <DynamicDebugBar />
        </terminalContext.Provider>
    )
}