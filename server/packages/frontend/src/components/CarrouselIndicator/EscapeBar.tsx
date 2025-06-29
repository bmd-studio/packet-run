
import { styled } from 'styled-components';

const EscapeWrapper = styled.div`
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 112px;
  padding: 32px;
  font-size: 40px;
  font-weight: 900;
  color: #000;
  z-index: 3;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function EscapeBar(props: { showText?: boolean }) {
    return (
        <EscapeWrapper>
            {
                props.showText ? `[ESC] Beginscherm` : null
            }
        </EscapeWrapper>
    );
}
