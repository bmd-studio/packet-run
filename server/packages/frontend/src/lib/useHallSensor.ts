import { useEffect, useState } from 'react';

/**
 * This is the minimum amount of time that should pass between polls. This is
 * the maximum amount of time required before triggering the sensor impacts the interface.
 */
const POLL_FREQUENCY_MS = 250;

/**
 * This hook will poll the local hall sensor server for the current value of the
 * connected hall sensor. It will return a boolean that indicates whether a
 * magnet is near to the hook or not.
 */
export default function useHallSensor(skip = false) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (skip) {
            if (isActive) {
                setIsActive(false);
            }
            return;
        }

        // Start an interval
        const interval = setInterval(async () => {
            try {
                // Retrieve the state from the server
                const response = await fetch('http://localhost:8000');
                const state = (await response.text()) === 'true';

                // GUARD: Check if the retrieved state is different from the 
                // currently saved state
                if (state !== isActive) {
                    setIsActive(state.valueOf());
                }
            } catch {
                // GUARD: If anything fails, default to a false state
                if (isActive) {
                    setIsActive(false);
                }
            }
        }, POLL_FREQUENCY_MS);

        // Clean up the interval whenever the effect fires
        return () => clearInterval(interval);
    }, [isActive]);
    
    return isActive;
}