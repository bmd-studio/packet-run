import { styled } from 'styled-components';
const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E6E6E6;
    box-sizing: border-box;
    padding-left: 72px;
    padding-right: 108px;
    padding-top: 46px;
    padding-bottom: 46px;
    display: flex;
    flex-direction: row;
    gap: 72px;
    height: 502px;
`;

const QuestionMark = styled.img`
    width: 50px;
    height: 100px;
`;
const Text = styled.p`
    font-size: 24px;
    line-height: normal;
    font-style: normal;color: #000;
    font-family: Doto;
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    width: 872px;
    margin-bottom: 24px;
`;
const TextContainer = styled.div`
    width: 872px;
`;
export default function UnknownMap() {
    return (
        <Container>
            <QuestionMark alt="question mark" src='/question-mark-icon-graphic.svg' />
            <TextContainer>
                <Text>
                    Sommige routes zijn onbekend — herkenbaar aan de vraagtekens. Dat komt doordat bepaalde routers geen informatie terugsturen, vaak vanwege beveiliging of privacy-instellingen.
                </Text>
                <Text>
                    Toch kan je pakketje juist die route nemen, omdat die op dat moment het snelst of meest efficiënt is. Meestal is dat veilig, zeker als je data goed is versleuteld. Maar er zijn risico’s als het verkeer via netwerken loopt die minder waarde hechten aan privacy. Een verborgen route dus — maar soms verrassend effectief.
                </Text>
                <Text>
                    We weten dus niet waar je op dit moment bent, maar je kan nog steeds je pakketje vooruit sturen!
                </Text>
            </TextContainer>
        </Container >
    )
}
