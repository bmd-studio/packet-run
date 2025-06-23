import { PropsWithChildren, ReactNode } from 'react';
import { styled } from 'styled-components';
const NameContainer = styled.div`
    background-color: var(--background-light-gray);
    height: 42px;
    box-sizing: border-box;
    padding-left: 16px;
    font-size: 20px;
    padding-top: 6px;
    text-transform: uppercase;
    width: 100%;
`;


export interface LabeledHeaderProps extends PropsWithChildren {
    label?: ReactNode
}
export default function LabeledHeader(props: LabeledHeaderProps) {
    return (
        <NameContainer>
            {props.children}
            {props?.label || null}
        </NameContainer>
    )
}
