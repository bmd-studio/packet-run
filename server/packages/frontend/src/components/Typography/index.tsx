import { PropsWithChildren, SVGTextElementAttributes, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export type TextWithStrokeProps = PropsWithChildren
    & SVGTextElementAttributes<SVGTextElement>;

export function Title({ children, ...rest }: TextWithStrokeProps) {
    return (
        <TextWithStroke
            fontSize="80"
            height={68}
            stroke="var(--light-gray)"
            fontFamily="var(--font-doto)"
            strokeWidth={12}
            {...rest}
        >
            {children}
        </TextWithStroke>
    );
}

export function InstructionTitle({ children, ...rest }: TextWithStrokeProps) {
    return (
        <TextWithStroke
            fontSize="80"
            height={68}
            stroke="var(--light-gray)"
            fontFamily="var(--font-doto)"
            strokeWidth={12}
            {...rest}
        >
            {children}
        </TextWithStroke>
    );
}

export function Subtitle({ children, ...rest }: TextWithStrokeProps) {
    return (
        <TextWithStroke
            fontSize="40"
            height={32}
            stroke="var(--light-gray)"
            fontFamily="var(--font-doto)"
            strokeWidth={12}
            {...rest}
        >
            {children}
        </TextWithStroke>
    );
}

export function TextWithStroke({ children, height, stroke, strokeWidth, ...rest }: TextWithStrokeProps) {
    const [width, setWidth] = useState(0);
    const textRef = useRef<SVGTextElement | null>(null);

    useEffect(() => {
        setWidth(textRef.current?.getComputedTextLength() || 0);
    }, [children]);

    return (
        <svg width={width} height={height}>
            <text
                x="0"
                y="0"
                dominantBaseline="hanging"
                stroke={stroke}
                strokeWidth={strokeWidth}
                {...rest}
                ref={textRef}
            >
                {children}
            </text>
            <text
                x="0"
                y="0"
                dominantBaseline="hanging"
                {...rest}
            >
                {children}
            </text>
        </svg>
    )
}

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
`;
