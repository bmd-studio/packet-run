
import { styled } from 'styled-components';
import CarrouselIndicator from '../CarrouselIndicator';
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
`;
interface OnBoadingProps extends React.PropsWithChildren {
    indicator: {
        stepAmount: number;
        currentStep: number;
    }
}
export function OnboardingScreen(props: OnBoadingProps) {
    const { children, indicator } = props;
    return (
        <Background>
            <CarrouselIndicator currentStep={indicator.currentStep} stepAmount={indicator.stepAmount} />
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </Background>
    )
}
