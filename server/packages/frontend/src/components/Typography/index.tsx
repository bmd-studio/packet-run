import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 80px;
    line-height: 68px;
    -webkit-text-stroke: 8px var(--light-gray);
    paint-order: stroke fill;
    color: black;
`;

export const Subtitle = styled.h2`
    font-size: 40px;
    font-weight: 400;
    -webkit-text-stroke: 8px var(--light-gray);
    paint-order: stroke fill;
    color: black;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
