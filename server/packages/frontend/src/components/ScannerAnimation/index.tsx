import { useEffect, useState } from 'react';
import { css, styled } from 'styled-components'

const Ellipse = styled.ellipse<{ highlighted: boolean }>`
    stroke: ${({ highlighted }) => highlighted ? 'var(--yellow)' : 'black'};
    stroke-width: 8px;
    fill: none;
    transition: stroke 0.2s ease-out;

    ${({ highlighted }) => highlighted && css`
        transition: none;
    `}
`;

export default function ScannerAnimation() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % 4);
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <svg viewBox="0 0 500 500" width="600" height="600">
            <Ellipse cx="250" cy="280" rx="25" ry="6.25" highlighted={index === 3} />
            <Ellipse cx="250" cy="260" rx="100" ry="25" highlighted={index === 2} />
            <Ellipse cx="250" cy="235" rx="175" ry="43.75" highlighted={index === 1} />
            <Ellipse cx="250" cy="200" rx="200" ry="50" highlighted={index === 0} />
        </svg>
    )
}