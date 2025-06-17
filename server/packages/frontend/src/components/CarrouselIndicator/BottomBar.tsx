
import { styled } from "styled-components";

const BottomBarWrapper = styled.div`
    width: 100vw;
    position: absolute;
    bottom: 0px;
    height: 112px;
    padding:32px;
    font-size: 40px;
    font-weight: 900;
    color: #000;
    z-index: 3;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    background-color: white;
`;


const Arrow = styled.span`
    height: 100%;
    padding: 32px;
    padding-left: 32px;
    padding-right: 32px;
    color: #000;
    font-family: Doto;
    font-size: 40px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    position: absolute;
    box-sizing: border-box;
    font-family: var(--font-doto);
`;
const BackArrow = styled(Arrow)`
  left: 0px;
  bottom: 0px;
`;

const NextArrow = styled(Arrow)`
  right: 0px;
  bottom: 0px;
`;

const StepIndicatorBall = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid black;
  border-radius: 100%;
`;
const StepIndicatorBallFilled = styled(StepIndicatorBall)`
  background-color: black;
`;

const CenterIndicatorWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    flex-direction: column;
`;
const StepIndicatorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
  height: 100%;
  flex-direction: row;
  height: auto;
`;


export default function BottomBar(props: { stepAmount: number, currentStep: number }) {
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
        <BottomBarWrapper>
            <BackArrow>
                [{`<-`}] Terug
            </BackArrow>
            <NextArrow>
                Volgende [{`->`}]
            </NextArrow>
            <CenterIndicatorWrapper>
                <StepIndicatorWrapper>
                    {
                        steps
                    }
                </StepIndicatorWrapper>
            </CenterIndicatorWrapper>
        </BottomBarWrapper>
    );
}
