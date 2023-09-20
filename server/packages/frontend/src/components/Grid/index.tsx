import styled from 'styled-components';
import PatternedBackground from '../PatternedBackground';

const Grid = styled(PatternedBackground)`
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-areas: "main packet";
    height: 100vh;
`;

export default Grid;