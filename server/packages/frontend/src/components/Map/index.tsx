import { useEffect, useRef } from 'react';
import { useTerminal } from '../RegisterTerminal';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { LOCATION_LAT, LOCATION_LNG, MAPBOX_TOKEN } from '@/config';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css'; 

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

        // Determine where the center of the map should be
        const center: [number, number] = address?.isInternalIP ? [
            LOCATION_LNG,
            LOCATION_LAT,
        ] : [
            (run?.currentHop?.address?.info?.location.longitude || 0),
            (run?.currentHop?.address?.info?.location.latitude || 0) + 0.15,
        ];

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/leinelissen/clkjn5dqa00db01phfcjig946',
            accessToken: MAPBOX_TOKEN,
            zoom: 9,
            center,
            interactive: true,
        });

        // Determine the coordinates for other hops that should be visible
        const coords: [number,  number][] = run.hops.filter((h) => (
            !!h.address?.info?.location.longitude || h.address?.isInternalIP
        )).map((hop) => hop.address?.isInternalIP ? [
            LOCATION_LNG,
            LOCATION_LAT,
        ] : [
            hop.address?.info?.location.longitude || 0,
            hop.address?.info?.location.latitude || 0,
        ]);

        if (!coords.length) {
            return;
        }

        // Then, create a new bound from all coordinates
        const bounds = coords.reduce((bounds, coord) => {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coords[0], coords[0]));

        // Fit the map to the resulting bounds
        map.current?.fitBounds(bounds, { 
            padding: { top: 340, left: 200, bottom: 200, right: 100 }, 
            minZoom: 7,
            maxZoom: 12,
        });
       
        map.current.on('load', () => {
            // Create a marker for each coordinate
            coords.forEach((coord, i) => {
                new mapboxgl.Marker({ color: 'var(--yellow)', scale: 1.5 })
                    .setLngLat(coord)
                    .addTo(map.current as mapboxgl.Map);
    
                const previous = coords[i - 1];
                if (previous) {
                    map.current?.addLayer({
                        type: 'line',
                        id: 'line-' + i,
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: [
                                        previous,
                                        coord
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
            });
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