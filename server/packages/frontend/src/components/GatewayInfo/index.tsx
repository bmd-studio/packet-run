import styled from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    gap: 8px;
    background-color: red;
    height: 100vh;
    grid-area: main;
    width: 60%;
    z-index:1;
`;

export default function GatewayInfo() {
    return (
        <Wrapper >
            <h1> Hellos </h1>
        </Wrapper>
    )
}
