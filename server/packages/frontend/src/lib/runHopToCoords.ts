import { RegisterTerminalRunHopFragment } from '@/data/generated';

/**
 * A function to return a set of coordinates from a given RunHop
 */
export default function runHopToCoords(hop: RegisterTerminalRunHopFragment): [number, number] {
    // GUARD: Check if the location is available
    if (!hop.address?.info?.location?.longitude || !hop.address?.info?.location?.latitude) {
        console.error('No location found for hop', hop);
        return [0, 0];
    }

    return [
        hop.address?.info?.location?.longitude,
        hop.address?.info?.location?.latitude,
    ];
}