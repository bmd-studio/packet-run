import { styled } from 'styled-components';
import EscapeBar from './EscapeBar';
import BottomBar from './BottomBar';


const CarrouselWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 3;
  pointer-events:none;
`;


export interface CarrouselProps {
    stepAmount: number,
    currentStep: number,
    showSteps?: boolean,
    showArrows?: boolean,
    hideBottom?: boolean,
    customNextText?: string;
}
export default function CarrouselIndicator(props: CarrouselProps) {
    const { currentStep, hideBottom = false } = props;
    return (
        <CarrouselWrapper>
            <EscapeBar showText={currentStep > 0} />
            {hideBottom ? null :
                <BottomBar {...props} />
            }
        </CarrouselWrapper>
    );
}
