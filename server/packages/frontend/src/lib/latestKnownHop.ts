import { RegisterTerminalRunHopFragment, RunHopStatus } from '@/data/generated';

interface PartialRun {
    currentHop: RegisterTerminalRunHopFragment;
    hops: RegisterTerminalRunHopFragment[];
}

/**
 * Helper function to retrieve the latest hop that had a known location
 */
export default function retrieveLatestKnownHop(run: PartialRun | null | undefined) {
    // GUARD: If the current hop has a location, return it immediately
    if (run?.currentHop?.address?.info?.location?.longitude) {
        return run.currentHop;
    }

    // If not, cycle through all previous hops and find the latest with a proper
    // location
    return run?.hops?.sort((a, b) => a.hop - b.hop)
        .find((hop) => {
            return hop.status === RunHopStatus.Actual
                && (
                    hop.address?.info?.location?.longitude
                    || hop.address?.isInternalIP
                )
        });
}