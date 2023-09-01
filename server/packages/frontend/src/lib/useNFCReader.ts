import { Pn532 } from 'pn532.js';
import Pn532Hf14a from 'pn532.js/plugin/Hf14a.js';
import { useEffect, useRef, useState } from 'react';
import Pn532WebserialAdapter from './WebSerialAdapter';

/**
 * This is the minimum amount of time that should pass between successive scans.
 * This affects how fast we can detect that a card is scanned and potentially removed.
 */
const SCAN_FREQUENCY_MS = 250;

interface State {
    lastScan: number | null;
    id: string | null;
    isScanning: boolean;
    ready: boolean;
}

const initialState: State = {
    lastScan: null,
    id: null,
    isScanning: false,
    ready: false,
};

/**
 * This hook will enable a PN532 NFC Reader that is connected to the Raspberry
 * Pi 4 over an UART connection using the GPIO pins. It will return the NFC ID
 * for the currently scanned NFC tag.
 */
export default function useNFCReader() {
    // We'll store the nfcId in a state so it can update the implementing
    // component once it changes
    const [nfcId, setNfcId] = useState<string | null>(null);

    // We'll keep all the scanning state in a ref, so that we don't update the
    // parent component each time a scan is executed
    const state = useRef(initialState);

    // Also keep a reference to the library
    const pn532 = useRef(new Pn532());

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        async function setup() {
            // Initialize the pn532 plugins
            await pn532.current.use(new Pn532WebserialAdapter());
            await pn532.current.use(new Pn532Hf14a());

            // Signal that we're ready for the state
            state.current.ready = true;
            
            // Then kick off the scan loop
            scheduleScan();
        }

        async function handleScan() {
            if (state.current.isScanning) {
                return scheduleScan();
            }

            // Set scanning flag to true
            state.current.isScanning = true;

            try {
                // Attempt to read the card. This will throw if the timeout is reached.
                const response = await pn532.current.$hf14a.mfSelectCard({ timeout: SCAN_FREQUENCY_MS });
                
                // GUARD: Check if the response differs from the current id
                if (state.current.id !== response.uid.hex) {
                    // If so, modify the state
                    setNfcId(response.uid.hex);
                }
                
                // Also store the nfcid in the actual state
                state.current.id = response.uid.hex;
            } catch(e) {
                // GUARD: Check if there was an nfcId previously
                if (state.current.id !== null) {
                    // If so, set it to null
                    setNfcId(null);
                }

                // Also store it in state
                state.current.id = null;

                // GUARD: Check if the error is for the timeout
                if (e instanceof Error) {
                    if (!e.message.startsWith('readRespTimeout')) {
                        // If it isn't throw the resulting error
                        // NOTE: This will end the scanning loop...
                        throw e;
                    }
                }
            }

            // Update the scanning state
            state.current.isScanning = false;
            state.current.lastScan = new Date().getTime();

            // Schedule the next scan
            scheduleScan();
        }

        function scheduleScan() {
            // Calculate how many ms to the next scan
            const msToNextScan = state.current.lastScan
                ? Math.max(0, state.current.lastScan + SCAN_FREQUENCY_MS - new Date().getTime())
                : 0;

            // Schedule the next scan
            timeout = setTimeout(handleScan, msToNextScan);
        }
        
        setup();
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        };
    }, []);

    return nfcId;
}