
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

const StepIndicatorLetter = styled.h3`
    color: black;
    width: 20px;
    height: 20px;
    line-height: 12px;
    font-size: 44px;
    text-transform: lowercase
`;
const StepIndicatorLetterFilled = styled(StepIndicatorLetter)`
    font-size: 50px;
    line-height: 16px;
`;

function Arrows(props: { showForward: boolean, showBackward: boolean, customNextText?: string }) {
    const { showForward, showBackward, customNextText } = props;
    return (
        <>
            {showBackward ?
                (<BackArrow>
                    [{`<-`}] Terug
                </BackArrow>
                ) : null
            }

            {
                showForward ?
                    (
                        <NextArrow>
                            {customNextText ? `${customNextText}` : `Volgende`} [{`->`}]
                        </NextArrow>
                    ) : null
            }
        </>
    )
}

export default function BottomBar(props: {
    stepAmount: number,
    currentStep: number,
    showArrows?: boolean,
    showSteps?: boolean
    customNextText?: string;
}) {
    const {
        stepAmount,
        currentStep,
        showArrows = true,
        showSteps = true,
        customNextText
    } = props;
    let showForward = true;
    let showBackward = true;
    if (!showArrows) {
        showForward = false;
        showBackward = false;
    }
    if (currentStep < 0) {
        showBackward = false;
    }
    const steps = [];
    for (let i = 0; i < stepAmount && showSteps; i++) {
        if (currentStep >= i) {
            steps.push(<StepIndicatorLetterFilled key={i}>•</StepIndicatorLetterFilled>);
        } else {
            steps.push(<StepIndicatorLetter key={i}>o</StepIndicatorLetter>);
        }
    }
    return (
        <BottomBarWrapper>
            <Arrows
                showBackward={showBackward}
                showForward={showForward}
                customNextText={customNextText}

            />
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
