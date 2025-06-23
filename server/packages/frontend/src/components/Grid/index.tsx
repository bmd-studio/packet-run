import styled from 'styled-components';
import { PatternedBackgroundDark } from '../PatternedBackground';

const Grid = styled(PatternedBackgroundDark)`
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-areas: "main packet";
    height: 100vh;
    overflow: hidden;
`;

export default Grid;
