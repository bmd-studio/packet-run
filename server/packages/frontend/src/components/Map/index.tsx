import { RefObject, useEffect, useRef } from 'react';
import { useTerminal } from '../RegisterTerminal';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { MAPBOX_TOKEN } from '@/config';
import { styled } from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RegisterTerminalRunHopFragment, RunHopStatus, TerminalType } from '@/data/generated';
import runHopToCoords from '@/lib/runHopToCoords';
import generateDot from './dot';
import curvedLine from './curvedLine';
import retrieveLatestKnownHop from '@/lib/latestKnownHop';
import UnknownMap from './unkown';
import { filterOutHopsWithUnkownLocation } from '@/lib/hopHelpers';

/** Amount of time before map load is kicked off */
const MAP_TIMEOUT = 3_000;

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`;


export interface MapProps {
    shouldDisplayMap?: boolean;
    delayed?: boolean;
}

function addMarkers(
    map: RefObject<MapboxMap | null>,
    markers: [number, number][],
    currentLocation?: { latitude: number, longitude: number }
) {
    if (!map) {
        return;
    }
    const lng = currentLocation?.longitude || -1;

    markers.forEach((coord) => {
        if (coord[0] === 0 && coord[1] === 0) {
            return;
        }
        if (coord[0] === lng) {
            // Only add the layer if it doesn't exist yet
            // TODO: Add the new marker in here
            if (!map.current?.getLayer('layer-with-orange-dot')) {
                map.current?.addLayer({
                    id: 'layer-with-orange-dot',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [{
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: coord,
                                },
                                properties: {},
                            }]
                        }
                    },
                    layout: {
                        "icon-image": 'orange-dot',
                    }
                });
            }
        } else {
            // TODO: add the square marker in here
            new mapboxgl.Marker({
                color: coord[0] === lng ? 'var(--orange)' : '#FF0000',
                scale: 1.0,
            }).setLngLat(coord)
                .addTo(map.current as mapboxgl.Map);
        }
    });
}

function addLinesToPreviousHops(
    map: RefObject<MapboxMap | null>,
    hops: RegisterTerminalRunHopFragment[],
) {

    hops.reduce<RegisterTerminalRunHopFragment | null>((prev, hop) => {
        if (prev && hop.address && prev.address) {
            map.current?.addLayer({
                type: 'line',
                id: `line-${hop.hop}`,
                source: {
                    type: 'geojson',
                    data: curvedLine(runHopToCoords(hop), runHopToCoords(prev)),
                },
                paint: {
                    "line-color": '#FF781F',
                    "line-width": 3,
                }
            });
        }

        return hop;
    }, null);
}
function addLinesToAvailableHops(
    map: RefObject<MapboxMap | null>,
    hops: RegisterTerminalRunHopFragment[],
    latestKnownHop: RegisterTerminalRunHopFragment | undefined
) {
    const address = latestKnownHop?.address;
    hops.forEach((hop) => {
        if (latestKnownHop && address && hop.address && hop.address.info?.location?.longitude) {
            map.current?.addLayer({
                type: 'line',
                id: `line-${hop.id}-foreground`,
                source: {
                    type: 'geojson',
                    data: curvedLine(runHopToCoords(hop), runHopToCoords(latestKnownHop)),
                },
                paint: {
                    "line-color": '#FF781F',
                    "line-width": 3,
                    'line-dasharray': [4, 4],
                }
            });
        }
    });

}

export default function Map(props: MapProps) {
    const { shouldDisplayMap, delayed = true } = props;
    const terminal = useTerminal();
    const { run } = terminal;

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<MapboxMap | null>(null);

    useEffect(() => {
        console.log('LOADING MAP', { delayed });
        
        async function loadMap() {
            if (!mapContainer.current || !run?.currentHop || !shouldDisplayMap) {
                return;
            }

            if (delayed) {
                await new Promise((resolve) => setTimeout(resolve, MAP_TIMEOUT));
            }
    
            // Retrieve the latest known hop (that was not null or unknown)
            const latestKnownHop = retrieveLatestKnownHop(run);
            const address = latestKnownHop?.address;
            const lng = address?.info?.location?.longitude;
            const lat = address?.info?.location?.latitude;
    
            if (!lng || !lat) return;
            const currentLocation = { longitude: lng, latitude: lat };
    
            // Determine where the center of the map should be
            const center: [number, number] = [lng, lat + 0.15];
    
            // Initialize map
            map.current = new mapboxgl.Map({
                container: mapContainer.current!,
                style: 'mapbox://styles/leinelissen/clkjn5dqa00db01phfcjig946?optimize=true',
                accessToken: MAPBOX_TOKEN,
                zoom: 9,
                center,
                interactive: false,
                performanceMetricsCollection: false,
                renderWorldCopies: false,
                preserveDrawingBuffer: false,
                antialias: false,
                attributionControl: false,
                fadeDuration: 0,
            });
    
            // Add the pulsing dot as an image
            const orangeDot = generateDot();
            map.current.addImage('orange-dot', orangeDot)
    
            const previousRoutes = filterOutHopsWithUnkownLocation(run.hops).filter((h) => (
                h.address && h.status === RunHopStatus.Actual
            )).sort((a, b) => a.hop - b.hop);
    
            // create coordinates for all hops and filters out hops with unkown locations
            const markers = filterOutHopsWithUnkownLocation((terminal.type === TerminalType.Receiver
                ? [...previousRoutes, ...run.availableHops]
                : [...(latestKnownHop ? [latestKnownHop] : []), ...run.availableHops]
            ))
                .map(runHopToCoords);
    
            // Then, create a new bound from all coordinates
            const bounds = markers.reduce((bounds, coord) => {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(markers[0], markers[0]));
    
            // Fit the map to the resulting bounds
            const defaultPadding = { top: 64, left: 64, bottom: 64, right: 64 };
            map.current?.fitBounds(bounds, {
                padding: defaultPadding,
                minZoom: 7,
                maxZoom: 12,
                animate: false,
            });
    
            map.current.on('load', () => {
                // Create a marker for each coordinate
                addMarkers(map, markers, currentLocation);
                // add all the lines to previous hops
                addLinesToPreviousHops(map, previousRoutes);
                // TODO:: should add markers.
                // add lines to available hops
                addLinesToAvailableHops(map, filterOutHopsWithUnkownLocation(run.availableHops), latestKnownHop);
            });
        }

        loadMap();

        return () => {
            map.current?.remove();
        };
    }, [run, terminal.type, shouldDisplayMap, delayed]);

    return shouldDisplayMap ? (
        <MapContainer
            ref={mapContainer}
        />
    ) : (
        <UnknownMap />
    );
}
