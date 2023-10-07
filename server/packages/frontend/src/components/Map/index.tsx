import { useEffect, useRef } from 'react';
import { useTerminal } from '../RegisterTerminal';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { LOCATION_LAT, LOCATION_LNG, MAPBOX_TOKEN } from '@/config';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import { RegisterTerminalRunHopFragment, RunHopStatus } from '@/data/generated';
import runHopToCoords from '@/lib/runHopToCoords';

const MapContainer = styled.div`
    height: 100vh;
    overflow: hidden;
    position: relative;
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

        const address = run.currentHop.address;
        const lng = (address?.info?.location.longitude || LOCATION_LNG);
        const lat = (address?.info?.location.latitude || LOCATION_LAT);

        // Determine where the center of the map should be
        const center: [number, number] = address?.isInternalIP ? [
            LOCATION_LNG, LOCATION_LAT,
        ] : [
            lng, lat + 0.15
        ];

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/leinelissen/clkjn5dqa00db01phfcjig946',
            accessToken: MAPBOX_TOKEN,
            zoom: 9,
            center,
            interactive: true,
        });

        const previousRoutes = run.hops.filter((h) => (
            h.address && h.status === RunHopStatus.Actual
        )).sort((a, b) => a.hop - b.hop);

        const markers = [...previousRoutes, ...run.availableHops]
            .map(runHopToCoords);

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
                new mapboxgl.Marker({ 
                    color: coord[0] === lng ? 'var(--yellow)' : '#666',
                    scale: 1.5
                }).setLngLat(coord)
                    .addTo(map.current as mapboxgl.Map);
            });

            previousRoutes.reduce<RegisterTerminalRunHopFragment | null>((prev, hop) => {
                if (prev && hop.address && prev.address) {
                    map.current?.addLayer({
                        type: 'line',
                        id: `line-${hop.hop}`,
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: [
                                        runHopToCoords(hop),
                                        runHopToCoords(prev),
                                    ]
                                }
                            }
                        },
                        paint: {
                            "line-color": '#F0EA00',
                            "line-width": 8,
                        }
                    });
                }

                return hop;
            }, null);

            run.availableHops.reduce<RegisterTerminalRunHopFragment | null>((prev, hop) => {
                if (prev && prev.address && hop.address) {
                    map.current?.addLayer({
                        type: 'line',
                        id: `line-${hop.hop}`,
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: [
                                        runHopToCoords(hop),
                                        runHopToCoords(prev),
                                    ]
                                }
                            }
                        },
                        paint: {
                            "line-color": '#F0EA00',
                            "line-width": 8,
                            'line-dasharray': [4, 4],
                        }
                    });
                }

                return hop;
            }, null);
        })
    }, [run]);

    return (
        <motion.div
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