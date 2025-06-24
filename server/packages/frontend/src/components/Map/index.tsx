import { useEffect, useRef } from 'react';
import { useTerminal } from '../RegisterTerminal';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { MAPBOX_TOKEN } from '@/config';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RegisterTerminalRunHopFragment, RunHopStatus, TerminalType } from '@/data/generated';
import runHopToCoords from '@/lib/runHopToCoords';
import generateDot from './dot';
import curvedLine from './curvedLine';
import retrieveLatestKnownHop from '@/lib/latestKnownHop';
import UnknownMap from './unkown';
import Label from '../Label';

const Container = styled.div`
   position:absolute; 
   left: 244px;
   bottom: 38px;
   width: 1175px;
`;

const MapContainer = styled.div`
    height: calc(50vh - 34px);
    overflow: hidden;
    position: relative;
    overflow: hidden;
    width: 61vw;
    border: 1px solid white;
`;


export default function Map() {
    const terminal = useTerminal();
    const { run } = terminal;

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<MapboxMap | null>(null);
    const shouldDisplayMap = !!run?.currentHop?.info?.location;

    console.log({ currentHop: run?.currentHop });
    useEffect(() => {
        if (!mapContainer.current || !run?.currentHop || !shouldDisplayMap) {
            return;
        }


        // Retrieve the latest known hop (that was not null or unknown)
        const latestKnownHop = retrieveLatestKnownHop(run);
        const address = latestKnownHop?.address;
        const lng = address?.info?.location?.longitude;
        const lat = address?.info?.location?.latitude;

        if (!lng || !lat) return;

        // Determine where the center of the map should be
        const center: [number, number] = [lng, lat + 0.15];

        // Initialize map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
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
        const orangeDot = generateDot(map.current);
        map.current.addImage('orange-dot', orangeDot)

        const previousRoutes = run.hops.filter((h) => (
            h.address && h.status === RunHopStatus.Actual
        )).sort((a, b) => a.hop - b.hop);

        const markers = (terminal.type === TerminalType.Receiver
            ? [...previousRoutes, ...run.availableHops]
            : [...(latestKnownHop ? [latestKnownHop] : []), ...run.availableHops]
        ).map(runHopToCoords);

        // Then, create a new bound from all coordinates
        const bounds = markers.reduce((bounds, coord) => {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(markers[0], markers[0]));

        // Fit the map to the resulting bounds
        map.current?.fitBounds(bounds, {
            padding: { top: 64, left: 64, bottom: 64, right: 64 },
            minZoom: 7,
            maxZoom: 12,
            animate: false,
        });

        map.current.on('load', () => {
            // Create a marker for each coordinate
            markers.forEach((coord) => {
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

            previousRoutes.reduce<RegisterTerminalRunHopFragment | null>((prev, hop) => {
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

            run.availableHops.forEach((hop) => {
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
        });

        return () => map.current?.remove();
    }, [run, terminal.type, shouldDisplayMap]);

    return (

        <motion.div
            key="map"
            style={{
                gridArea: 'main',
                willChange: 'transform',
                transform: 'translateZ(0)',
                zIndex: '20',
                pointerEvents: 'none',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
        >
            <Container>
                <Label>
                    {shouldDisplayMap ? `Kaart` : `Geen Kaart Beschikbaar`}
                </Label>
                {shouldDisplayMap ?
                    (
                        <MapContainer
                            ref={mapContainer}
                        />
                    ) :
                    (
                        <UnknownMap />
                    )
                }
            </Container>
        </motion.div>
    );
}
