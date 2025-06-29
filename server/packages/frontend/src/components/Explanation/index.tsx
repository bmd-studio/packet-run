import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import Label from '../Label';

const Container = styled.div`
    position: fixed;
    left: 164px;
    top: 264px;
    display: flex;
    flex-direction: row;
    gap: 52px;
    z-index: 20;
`;

const ImageWrapper = styled.div`
    width: 167px;
    display: flex;
    flex-direction: column;
    justify-content: start;
`;
const Image = styled.img`
    width: 100%;
`;
const ExplanationWrapper = styled.div`
    width: 904px;
    padding-top: 82px;
    box-sizing: border-box;
    & p, h1, h2, h3 {
        color: white;
    }
    & p:first-of-type {
        padding-top: 16px;
    }
    & p {
        font-size: 24px;
        margin-bottom: 24px;
        color: #FFF;
        font-family: Doto;
        font-size: 24px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        padding-left: 16px;
        padding-right: 16px;
    }
`;

export interface ExplanationProps extends PropsWithChildren {
    imageSrc: string;
    imageAlt: string;
}

export default function Explanation(props: ExplanationProps) {
    return (
        <Container>
            <ImageWrapper>
                <Image src={props.imageSrc} alt={props.imageAlt} />
            </ImageWrapper>
            <ExplanationWrapper>
                {props.children}
            </ExplanationWrapper>
        </Container>
    )

}
