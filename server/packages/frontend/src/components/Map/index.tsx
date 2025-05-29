import { useEffect, useRef } from 'react';
import { useTerminal } from '../RegisterTerminal';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { MAPBOX_TOKEN } from '@/config';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import { RegisterTerminalRunHopFragment, RunHopStatus, TerminalType } from '@/data/generated';
import runHopToCoords from '@/lib/runHopToCoords';
import generatePulsingDot from './pulsingDot';
import curvedLine from './curvedLine';
import retrieveLatestKnownHop from '@/lib/latestKnownHop';

const MapContainer = styled.div`
    height: 100vh;
    overflow: hidden;
    position: relative;
    overflow: hidden;
`;

export default function Map() {
    const terminal = useTerminal();
    const { run } = terminal;

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<MapboxMap | null>(null);

    useEffect(() => {
        if (!mapContainer.current || !run?.currentHop) {
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
            style: 'mapbox://styles/leinelissen/clkjn5dqa00db01phfcjig946',
            accessToken: MAPBOX_TOKEN,
            zoom: 9,
            center,
            interactive: true,
            performanceMetricsCollection: false,
        });

        // Add the pulsing dot as an image
        const pulsingDot = generatePulsingDot(map.current);
        map.current.addImage('pulsing-dot', pulsingDot)

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
            padding: { top: 340, left: 200, bottom: 200, right: 100 }, 
            minZoom: 7,
            maxZoom: 12,
            animate: false,
        });
       
        map.current.on('load', () => {
            // Create a marker for each coordinate
            markers.forEach((coord) => {
                if (coord[0] === lng) {
                    // Only add the layer if it doesn't exist yet
                    if (!map.current?.getLayer('layer-with-pulsing-dot')) {
                        map.current?.addLayer({
                            id: 'layer-with-pulsing-dot',
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
                                "icon-image": 'pulsing-dot',
                            }
                        });
                    }
                } else {
                    new mapboxgl.Marker({ 
                        color: coord[0] === lng ? 'var(--yellow)' : '#666',
                        scale: 1.5,
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
                            "line-color": '#F0EA00',
                            "line-width": 6,
                        }
                    });
                }

                return hop;
            }, null);

            run.availableHops.forEach((hop) => {
                if (latestKnownHop && address && hop.address && hop.address.info?.location?.longitude) {
                    map.current?.addLayer({
                        type: 'line',
                        id: `line-${hop.id}-background`,
                        source: {
                            type: 'geojson',
                            data: curvedLine(runHopToCoords(hop), runHopToCoords(latestKnownHop)),
                        },
                        paint: {
                            "line-color": '#5b5800',
                            "line-width": 6,
                        }
                    });
                    map.current?.addLayer({
                        type: 'line',
                        id: `line-${hop.id}-foreground`,
                        source: {
                            type: 'geojson',
                            data: curvedLine(runHopToCoords(hop), runHopToCoords(latestKnownHop)),
                        },
                        paint: {
                            "line-color": '#F0EA00',
                            "line-width": 6,
                            'line-dasharray': [4, 4],
                        }
                    });
                }
            });
        });

        return () => map.current?.remove();
    }, [run, terminal.type]);

    return (
        <motion.div
            style={{ 
                gridArea: 'main',
                willChange: 'transform',
                transform: 'translateZ(0)'
            }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
        >
            <MapContainer
                ref={mapContainer}
            />
        </motion.div>
    );
}