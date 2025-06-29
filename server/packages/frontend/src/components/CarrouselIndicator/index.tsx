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
`;


export default function CarrouselIndicator(props: { stepAmount: number, currentStep: number, showSteps?: boolean }) {
    const { currentStep } = props;
    return (
        <CarrouselWrapper>
            <EscapeBar showText={currentStep > 0} />
            <BottomBar {...props} />
        </CarrouselWrapper>
    );
}
