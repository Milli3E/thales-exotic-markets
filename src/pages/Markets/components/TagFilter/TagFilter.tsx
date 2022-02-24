import React from 'react';
import styled from 'styled-components';
import { FlexDivCentered } from 'styles/common';

type TagFilterProps = {
    disabled?: boolean;
    selected?: boolean;
    onClick?: (param: any) => void;
};

const TagFilter: React.FC<TagFilterProps> = ({ disabled, selected, onClick, children }) => {
    return (
        <Container className={`${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''}`} onClick={onClick}>
            {children}
        </Container>
    );
};

const Container = styled(FlexDivCentered)`
    border: 1px solid ${(props) => props.theme.borderColor.primary};
    border-radius: 30px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    padding: 4px 8px;
    margin-left: 6px;
    height: 28px;
    color: ${(props) => props.theme.textColor.primary};
    margin-bottom: 4px;
    cursor: pointer;
    &.selected,
    &:hover {
        background: ${(props) => props.theme.button.background.secondary};
        color: ${(props) => props.theme.button.textColor.primary};
    }
    &.disabled {
        cursor: default;
        opacity: 0.4;
    }
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
`;

export default TagFilter;
