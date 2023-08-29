import { useEffect, useRef } from 'react';
import { useTerminal } from '../RegisterTerminal';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { MAPBOX_TOKEN } from '@/config';

export default function Map() {
    const { run } = useTerminal();

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<MapboxMap | null>(null);

    useEffect(() => {
        if (map.current || !mapContainer.current) {
            return;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/leinelissen/clkjn5dqa00db01phfcjig946',
            accessToken: MAPBOX_TOKEN,
            zoom: 9,
            center: [
                run?.currentHop.address.info?.location.latitude || 0,
                run?.currentHop.address.info?.location.longitude || 0,
            ],
        });
    }, [run?.currentHop.address.info]);

    useEffect(() => {
        if (!map.current) {
            return;
        }

        map.current.panTo([
            run?.currentHop.address.info?.location.latitude || 0,
            run?.currentHop.address.info?.location.longitude || 0,
        ]);
    }, [run?.currentHop.address.info]);

    return (
        <div ref={mapContainer} />
    );
}