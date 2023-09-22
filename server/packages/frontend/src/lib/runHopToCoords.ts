import { LOCATION_LAT, LOCATION_LNG } from '@/config';
import { RegisterTerminalRunHopFragment } from '@/data/generated';

/**
 * A function to return a set of coordinates from a given RunHop
 */
export default function runHopToCoords(hop: RegisterTerminalRunHopFragment): [number, number] {
    if (hop.address?.isInternalIP) {
        return [LOCATION_LNG, LOCATION_LAT]
    }

    return [
        hop.address?.info?.location.longitude || LOCATION_LNG,
        hop.address?.info?.location.latitude || LOCATION_LAT,
    ];
}