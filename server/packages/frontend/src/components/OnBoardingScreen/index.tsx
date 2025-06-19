
import { styled } from 'styled-components';
import CarrouselIndicator, { CarrouselProps } from '../CarrouselIndicator';
import PatternedBackground from '../PatternedBackground';

const Background = styled(PatternedBackground)`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
`;
const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    box-sizing: border-box;
    & p {
      margin-bottom: 60px;
    }
`;
interface OnBoadingProps extends React.PropsWithChildren {
    indicator: CarrouselProps;
}
export function OnboardingScreen(props: OnBoadingProps) {
    const { children, indicator } = props;
    return (
        <Background>
            <CarrouselIndicator {...indicator} />
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </Background>
    )
}
