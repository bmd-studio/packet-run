import { 
    distance as tDistance,
    midpoint as tMidpoint,
    destination as tDestination,
    bearing as tBearing,
    bezierSpline
} from '@turf/turf';
import { lineString } from '@turf/helpers';

/**
 * A convenience function that generates a GeoJSON curved line from a set of
 * starting coordinates to a set of ending coordinates
 * @see https://stackoverflow.com/questions/68021824/give-curved-line-a-deeper-arc-in-turf-js-and-mapbox
 */
export default function curvedLine(start: [lng: number, lat: number], end: [lng: number, lat: number]) {
    const distance = tDistance(start, end, { units: 'kilometers' });
    const midpoint = tMidpoint(start, end);
    const bearing = tBearing(start, end);
    const rightSideArc = bearing - 90 > 180 ? 180 + (bearing + 90 - 180) : bearing - 90;
    const destination = tDestination(midpoint, distance / 7, rightSideArc, { units: 'kilometers' });

    const curvedLine = bezierSpline(
        lineString([start, destination.geometry.coordinates, end]),
    );

    return curvedLine;
}