import useNFCReader from "@/lib/useNFCReader";
import { useTerminal } from "../RegisterTerminal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TerminalStatus, useResetTerminalMutation, useScanNfcForTerminalMutation } from "@/data/generated";
import { MODE } from '@/config';

/** The amount of milliseconds between the scanner failing to detect an NFC tag
 * and the terminal being reset. */
const NFC_READER_TIMEOUT = 20_000;

export default function useNFCLogic(enabled = true) {
    const terminal = useTerminal();
    const nfcId = useNFCReader();
    const searchParams = useSearchParams();
    const [scannerTimeout, setScannerTimeout] = useState<[Date, Date] | null>(null);

    const [scanNfcForTerminal, { error, loading }] = useScanNfcForTerminalMutation();
    const [resetTerminal] = useResetTerminalMutation();

    useEffect(() => {
        // GUARD: If we're in standalone mode and the NFC ID is passed as a search parameter, scan the NFC for the terminal
        if (MODE === 'standalone' && searchParams.has('nfcId')
            && terminal.status === TerminalStatus.Idle
        ) {
            scanNfcForTerminal({
                variables: {
                    terminalId: terminal.id,
                    nfcId: searchParams.get('nfcId') as string,
                }
            });
        }
    }, [terminal.id, searchParams, terminal.status, scanNfcForTerminal]);

    useEffect(() => {
        // GUARD: Don't do anything when there isn't any NFC that is being
        // scanned currently. Resetting happens in the other hook
        if (!nfcId || !enabled) return;

        async function sendNfcToTerminal() {
            // GUARD: If the terminal is currently set to another nfcId, reset
            // the terminal first.
            if (terminal.run?.nfcId !== nfcId) {
                await resetTerminal({ variables: { terminalId: terminal.id } });
            }

            // Scan the NFC for the terminal
            scanNfcForTerminal({
                variables: {
                    terminalId: terminal.id,
                    nfcId: nfcId!,
                }
            });
        }

        sendNfcToTerminal();
    }, [terminal.id, nfcId, scanNfcForTerminal, resetTerminal, terminal.run, enabled]);

    useEffect(() => {
        // GUARD: Don't timeout in standalone mode
        if (MODE === 'standalone') return;

        // GUARD: Wait for nfcId to become null and a run to be set
        if (nfcId || !terminal.run || !enabled) {
            return;
        }

        // Set a timeout for the terminal to be reset. Also, store the date for
        // this in state, so we can display a bar at the top of the screen
        const now = new Date().getTime();

        setScannerTimeout([
            new Date(now + 1_000),
            new Date(now + 20_000),
        ]);
        const timeout = setTimeout(() => {
            resetTerminal({ variables: { terminalId: terminal.id } });
            setScannerTimeout(null);
        }, NFC_READER_TIMEOUT);

        return () => {
            // If anything changes, clear the timeouts
            clearTimeout(timeout);
            setScannerTimeout(null);
        };
    }, [nfcId, terminal.run, resetTerminal, terminal.id, enabled]);

    return { scannerTimeout, error, loading };
}
