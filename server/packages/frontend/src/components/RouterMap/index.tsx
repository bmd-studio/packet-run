import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import Label from '../Label';
import { useTerminal } from '../RegisterTerminal';
import Map from '../Map';

const MapContainer = styled.div`
    position:absolute; 
    left: 244px;
    bottom: 38px;
    height: 50vh;
    overflow: hidden;
    width: 61.2vw;
    border: 1px solid white;
`;
export default function RouterMap() {

    const terminal = useTerminal();
    const { run } = terminal;
    const shouldDisplayMap = !!run?.currentHop?.address?.info?.location;
    return (
        <motion.div
            key="map"
            style={{
                gridArea: 'main',
                willChange: 'transform',
                transform: 'translateZ(0)',
                zIndex: '3',
                pointerEvents: 'none',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
        >
            <MapContainer>
                <Label>
                    {shouldDisplayMap ? `Kaart` : `Geen Kaart Beschikbaar`}
                </Label>
                <Map shouldDisplayMap={shouldDisplayMap} />
            </MapContainer>
        </motion.div >
    )
}

