const RADII = {
    km: 6371,
    mile: 3960,
    meter: 6371000,
    nmi: 3440,
}

// convert to radians
function toRad(num: number) {
    return num * Math.PI / 180
}

export type LatLng = [lat: number, lng: number];

/**
 * A convenience function that calculate the distance between two sets of
 * coordinates in kms using the Haversine formula.
 */
export default function haversine(start: LatLng, end: LatLng) {
    const dLat = toRad(end[0] - start[0]);
    const dLon = toRad(end[1] - start[1]);
    const lat1 = toRad(start[0]);
    const lat2 = toRad(end[0]);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return RADII.km * c
}
