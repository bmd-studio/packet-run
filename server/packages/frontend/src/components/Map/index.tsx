import { useTerminal } from '../RegisterTerminal';
import { styled } from 'styled-components';
import UnknownMap from './unkown';
import StaticMap from './StaticMap';

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export interface MapProps {
    shouldDisplayMap?: boolean;
    delayed?: boolean;
}

export default function Map(props: MapProps) {
    const { shouldDisplayMap } = props;
    const terminal = useTerminal();
    const { run } = terminal;

    // Check if we have location data to display
    const hasLocationData = !!run?.currentHop?.address?.info?.location;

    return shouldDisplayMap && hasLocationData ? (
        <MapContainer>
            <StaticMap shouldDisplayMap={shouldDisplayMap} />
        </MapContainer>
    ) : (
        <UnknownMap />
    );
}
