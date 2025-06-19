import { styled } from 'styled-components';

const PatternedBackground = styled.div`
  background: #E6E6E6;
  background-image: radial-gradient(#D4D4D4 5%, transparent 0);
  background-size: 35px 35px;
`;

export default PatternedBackground;

export const PatternedBackgroundDark = styled.div`
  background: var(--background-black);
  background-image: radial-gradient(var(--background-dot-gray) 5%, transparent 0);
  background-size: 35px 35px;
`;
