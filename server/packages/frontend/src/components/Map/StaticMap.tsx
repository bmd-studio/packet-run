import { useMemo } from 'react';
import { styled } from 'styled-components';
import { MAPBOX_TOKEN } from '@/config';
import { RunHopStatus, TerminalType } from '@/data/generated';
import runHopToCoords from '@/lib/runHopToCoords';
import retrieveLatestKnownHop from '@/lib/latestKnownHop';
import { filterOutHopsWithUnkownLocation } from '@/lib/hopHelpers';
import { useTerminal } from '../RegisterTerminal';
import polyline from '@mapbox/polyline';

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MapImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export interface StaticMapProps {
    shouldDisplayMap?: boolean;
}

export default function StaticMap(props: StaticMapProps) {
    const { shouldDisplayMap } = props;
    const terminal = useTerminal();
    const { run } = terminal;

    const mapUrl = useMemo(() => {
        if (!run?.currentHop || !shouldDisplayMap) {
            return '';
        }

        // Retrieve the latest known hop
        const latestKnownHop = retrieveLatestKnownHop(run);
        const address = latestKnownHop?.address;
        const lng = address?.info?.location?.longitude;
        const lat = address?.info?.location?.latitude;

        if (!lng || !lat) {
            return '';
        }

        const previousRoutes = filterOutHopsWithUnkownLocation(run.hops).filter((h) => (
            h.address && h.status === RunHopStatus.Actual
        )).sort((a, b) => a.hop - b.hop);

        // Get all coordinates
        const markers = filterOutHopsWithUnkownLocation((terminal.type === TerminalType.Receiver
            ? [...previousRoutes, ...run.availableHops]
            : [...(latestKnownHop ? [latestKnownHop] : []), ...run.availableHops]
        ))
            .map(runHopToCoords)
            .filter(coord => coord[0] !== 0 && coord[1] !== 0);

        if (markers.length === 0) {
            return '';
        }

        // Build static map URL
        const baseUrl = 'https://api.mapbox.com/styles/v1/leinelissen/clkjn5dqa00db01phfcjig946/static';

        // Create markers for the static map
        const markerParams = markers.map((coord) => {
            const isCurrentLocation = coord[0] === lng;
            const color = 'ff781f'; // All markers orange
            const size = isCurrentLocation ? 'l' : 's';
            return `pin-${size}+${color}(${coord[0].toFixed(4)},${coord[1].toFixed(4)})`;
        }).join(',');

        // Create path connecting all markers using polyline encoding
        // Note: polyline.encode expects [lat,lng] but our markers are [lng,lat]
        // So we need to swap the coordinates for the polyline encoding
        const pathCoords: [number, number][] = markers.map(coord => [coord[1], coord[0]]); // Swap lat/lng
        const encodedPolyline = polyline.encode(pathCoords)
        const pathParams = markers.length > 1 ?
            `path-2+ff781f(${encodeURIComponent(encodedPolyline)})` : '';

        // Combine markers and path
        const overlayParams = [markerParams, pathParams].filter(Boolean).join(',');

        // Use bounding box format with markers and path, oriented north
        const staticMapUrl = `${baseUrl}/${overlayParams}/auto/960x428@2x?access_token=${MAPBOX_TOKEN}&padding=64`;

        return staticMapUrl;
    }, [run, terminal.type, shouldDisplayMap]);

    if (!shouldDisplayMap) {
        return null;
    }

    return (
        <MapContainer>
            <MapImage src={mapUrl} alt="Packet route map" />
        </MapContainer>
    );
} 