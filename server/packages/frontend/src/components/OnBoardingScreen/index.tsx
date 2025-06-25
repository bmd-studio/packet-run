
import { styled } from 'styled-components';

const OrangeBackground = styled.div`
    background-color: var(--background-orange);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;


const EscapeWrapper = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  position: fixed;
  box-sizing: border-box;
  padding: 64px;
  z-index: 2;
  color: white;
`;

function Escape() {
    return (
        <EscapeWrapper>
      [ESC] Beginscherm
        </EscapeWrapper>
    )
}

const ArrowWrappers = styled.div`
  width: 100vw;
  position: fixed;
  box-sizing: border-box;
  padding: 64px;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  bottom: 0px;
  left: 0px;

`;

const Arrow = styled.div`
  font-size: 40px;
  font-weight: 900;
  color: white;
  position: absolute;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
`;
const BackArrow = styled(Arrow)`
  left: 0px;
`;
const NextArrow = styled(Arrow)`
  right: 0px
`;


const StepIndicatorBall = styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid black;
  border-radius: 100%;
`;
const StepIndicatorBallFilled = styled(StepIndicatorBall)`
  background-color: black;
`;

function ArrowIndicators(props: { stepAmount: number, currentStep: number }) {
    const { stepAmount, currentStep } = props;
    const steps = [];
    for (let i = 0; i < stepAmount; i++) {
        if (currentStep >= i) {
            steps.push(<StepIndicatorBallFilled key={i} />)
        } else {
            steps.push(<StepIndicatorBall key={i} />)
        }
    }
    return (
        <ArrowWrappers>
            <BackArrow>
        [{`<-`}] Terug
            </BackArrow>
            <NextArrow>
        Volgende [{`->`}]
            </NextArrow>
            {
                steps
            }
        </ArrowWrappers>
    );
}
interface OnBoadingProps extends React.PropsWithChildren {
  indicator: {
    stepAmount: number;
    currentStep: number;
  }
}
export function OnboardingScreen(props: OnBoadingProps) {
    const { children, indicator } = props;
    return (
        <OrangeBackground>
            <Escape />
            <ArrowIndicators stepAmount={indicator.stepAmount} currentStep={indicator.currentStep} />
            {children}
        </OrangeBackground>
    )
}
