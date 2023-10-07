import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 80px;
    line-height: 68px;
    text-shadow:
        8px 8px 0 var(--light-gray),
        -8px 8px 0 var(--light-gray),
        -8px -8px 0 var(--light-gray),
        8px -8px 0 var(--light-gray);
    color: black;
`;

export const Subtitle = styled.h2`
    font-size: 40px;
    font-weight: 400;
    text-shadow:
        8px 8px 0 var(--light-gray),
        -8px 8px 0 var(--light-gray),
        -8px -8px 0 var(--light-gray),
        8px -8px 0 var(--light-gray);
    color: black;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
