'use client';

import { useTerminal } from '@/components/RegisterTerminal';
import { MODE } from '@/config';
import { TerminalStatus, TerminalType, useCreateReturnPacketMutation } from '@/data/generated';
import useHallSensor from '@/lib/useHallSensor';
import { useEffect } from 'react';

/**
 * This component tracks the return packet states on the server, based on the
 * hall sensor. 
 */
export default function ForgeManager() {
    const terminal = useTerminal();
    const isHallSensorActive = useHallSensor(terminal.status !== TerminalStatus.ScanningNfc || MODE === 'standalone');
    const [createReturnPacket, { loading }] = useCreateReturnPacketMutation();

    useEffect(() => {
        async function forgePacket() {
            await createReturnPacket({
                variables: { 
                    terminalId: terminal.id,
                    isPacketCreated: false,
                }
            });
            await new Promise((resolve) => setTimeout(resolve, 5_000));
            await createReturnPacket({
                variables: {
                    terminalId: terminal.id,
                    isPacketCreated: true
                }
            });
        }

        if (terminal.type === TerminalType.Server
                && terminal.status === TerminalStatus.ScanningNfc
                && terminal.run
                && !loading
                && isHallSensorActive
        ) {
            forgePacket();
        }
    }, [terminal, loading, isHallSensorActive, createReturnPacket]);

    return null;
} 