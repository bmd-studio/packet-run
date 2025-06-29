import { PropsWithChildren } from "react";
import styled from "styled-components";
import CheckBox from "../CheckBox";

export interface CheckBoxListItemProps extends PropsWithChildren {
    checked: boolean;
}

const ListItemWrapper = styled.li`
    width :100%;
    display: flex;
    flex-direction: row;
    gap: 32px;
    margin-bottom: 32px;
`;
const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`;
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export default function CheckBoxListItem(props: CheckBoxListItemProps) {

    const { children, checked } = props;
    return (
        <ListItemWrapper>
            <CheckBoxWrapper>
                <CheckBox checked={checked} />
            </CheckBoxWrapper>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </ListItemWrapper>
    )
}
