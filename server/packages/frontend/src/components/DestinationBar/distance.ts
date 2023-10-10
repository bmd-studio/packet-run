import { RegisterTerminalRunHopFragment } from '@/data/generated';
import runHopToCoords from '@/lib/runHopToCoords';
import { distance } from '@turf/turf';

const UNKNOWN = '???';

/**
 * Helper function to display the distance between two hops
 */
export default function displayDistance(
    from: RegisterTerminalRunHopFragment | undefined,
    to: RegisterTerminalRunHopFragment | undefined,
) {
    const fromLocation = from?.address?.info?.location;
    const toLocation = to?.address?.info?.location;

    // GUARD: Check that all coordinates are present on both hops
    if (!from || !to
        || (!fromLocation?.latitude && !fromLocation?.longitude && !from.address?.isInternalIP) 
        || (!toLocation?.latitude && !toLocation?.longitude && !to.address?.isInternalIP)
    ) {
        return UNKNOWN;
    }

    // Then, calculate the raw distance
    const d = distance(
        runHopToCoords(from),
        runHopToCoords(to),
        { units: 'kilometers' }
    );

    return `${d.toFixed(0)}KM`;
}