import { RegisterTerminalRunHopFragment } from '@/data/generated';
import { distance } from '@turf/turf';

const UNKNOWN = '???';

/**
 * Helper function to display the distance between two hops
 */
export default function displayDistance(
    from: RegisterTerminalRunHopFragment,
    to: RegisterTerminalRunHopFragment,
) {
    const fromLocation = from.address?.info?.location;
    const toLocation = to.address?.info?.location;
    
    // GUARD: Check that all coordinates are present on both hops
    if (!fromLocation?.latitude
        || !fromLocation.longitude
        || !toLocation?.latitude
        || !toLocation.longitude) 
    {
        return UNKNOWN;
    }

    // Then, calculate the raw distance
    const d = distance(
        [fromLocation.longitude, fromLocation.latitude],
        [toLocation.longitude, toLocation.latitude],
        { units: 'kilometers' }
    );

    return `${d.toFixed(0)}KM`;
}