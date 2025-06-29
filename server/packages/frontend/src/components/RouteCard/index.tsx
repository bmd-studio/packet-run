import { styled } from 'styled-components';

type RouteTypes = 'alternative' | 'recommended' | 'back';
export interface RouteCardProps {
    name: string;
    type?: RouteTypes;
    destination?: string;
    owner?: string;
    distance?: number;
    explanation?: string;
}

const Container = styled.div`
position: relative;
  width: 304px;
`;
const NameContainer = styled.div`
  background-color: var(--background-light-gray);
  height: 42px;
  box-sizing: border-box;
  padding-left: 16px;
  font-size: 20px;
  padding-top: 6px;
  text-transform: uppercase;

`;
function getBackgroundColorForRouteType(routeType?: RouteTypes) {
    switch (routeType) {
        case 'alternative':
            return 'var(--unobtrusive-gray)';
        case 'back':
            return 'var(--gray)';
        case 'recommended':
            return 'var(--green)';
    }
    return '#FFFFFF00'
}

const RouteTypeContainer = styled.div < { routeType?: RouteTypes } > `
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${props => getBackgroundColorForRouteType(props.routeType)};
  font-size: 18px;
  right:0px;
  top: 4px;
  position: absolute;
  color: white;
  height: 34px;
  padding-top: 4px;
`;

function Type(props: { type?: RouteTypes }) {
    const { type } = props;
    if (!type) {
        return null;
    }
    const typeText: Record<RouteTypes, string> = {
        alternative: 'Alternatief',
        recommended: 'Aanbevolen',
        back: 'Terug'
    }

    return (
        <RouteTypeContainer routeType={type}>
            {typeText[type]}
        </RouteTypeContainer>
    )
}

const DestinationBar = styled.div`
    background-color: var(--orange);
    height: 66px;
    width: 100%;
      text-transform: uppercase;
      font-size: 24px;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;

`;

const OwnerContainer = styled.div`
    width: 100%;
    color: white;
    font-size: 18px;
    padding: 16px;
    box-sizing: border-box;
    border-bottom: 1px solid white;
    position:relative;
`;
const OwnerLine = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
const OwnerSpan = styled.span`
    flex-grow: 1;
    text-align: right;
`;
const ExplanationContainer = styled.div`
    width: 100%;
    height: 473px;
    background: linear-gradient(180deg, #272727 40%, rgba(0, 0, 0, 0.20) 100%);
    color: white;
    font-size: 18px;
    box-sizing: border-box;
`;
const Explanation = styled.p`
    color: white;
    font-size: 18px;
    padding: 16px;
`;

export default function RouteCard(props: RouteCardProps) {
    const { name = '', type, destination, owner, distance, explanation } = props;
    const renderOwnerContainer = !!owner || !!distance;
    return (
        <Container>
            <NameContainer>
                {name}
                <Type type={type} />
            </NameContainer>
            <DestinationBar>
                {destination}
            </DestinationBar>
            <ExplanationContainer>
                {renderOwnerContainer ? (
                    <OwnerContainer>
                        {owner ? (<OwnerLine><span>Eigenaar</span><OwnerSpan>{owner}</OwnerSpan></OwnerLine>) : null}
                        {distance ? (<OwnerLine><span>Afstand</span><OwnerSpan>{distance}km</OwnerSpan></OwnerLine>) : null}
                    </OwnerContainer>) : null
                }
                <Explanation>
                    {explanation}
                </Explanation>
            </ExplanationContainer>
        </Container>
    );
}
