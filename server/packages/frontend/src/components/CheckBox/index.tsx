import { styled } from 'styled-components';

const CheckBoxContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  font-size: 64px;
  text-align: center;
  align-items:center;
`;
const CheckContainer = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  font-size: 64px;
  top: -6px;
  left: 6px;

`;

export default function CheckBox(props: { checked: boolean }) {

    return (
        <CheckBoxContainer>
            <span>[]</span>
            <CheckContainer>
                {props.checked ? `x` : null}
            </CheckContainer>
        </CheckBoxContainer>
    )

}
