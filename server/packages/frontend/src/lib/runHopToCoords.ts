import { RegisterTerminalRunHopFragment } from '@/data/generated';

/**
 * A function to return a set of coordinates from a given RunHop
 */
export default function runHopToCoords(hop: RegisterTerminalRunHopFragment): [number, number] {
    return [
        hop.address?.info?.location?.longitude,
        hop.address?.info?.location?.latitude,
    ];
}