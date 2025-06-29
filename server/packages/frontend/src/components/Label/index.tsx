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
    position: relative;
`;

const LabelWrapper = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & div, p , h1, h2, h3 {
        height: 34px;
        padding-left: 16px;
        padding-right: 16px;
        font-size: 18px;
    }
`;



export interface LabelProps extends PropsWithChildren {
    label?: ReactNode
}
export default function Label(props: LabelProps) {
    return (
        <NameContainer>
            {props.children}
            <LabelWrapper>
                {props?.label || null}
            </LabelWrapper>
        </NameContainer>
    )
}
