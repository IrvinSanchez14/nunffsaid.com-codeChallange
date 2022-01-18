import React from "react";
import styled, { css } from "styled-components";

interface ICardProps {
  message: string
  option: number
  onClear: (index: number) => void
  id: number
}

export const Card: React.FC<ICardProps> = ({ message, option, onClear, id }) => {
  return (
    <StyledContainer type={option}>
      <StyledMessage>{message}</StyledMessage>
      <StyledClear onClick={() => onClear(id)}>Clear</StyledClear>
    </StyledContainer>
  )
}

const StyledContainer = styled.div<{ type: number }>`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  border-radius: 5px;
  padding: 15px 0px 25px 0px;
  margin: 10px 0px 10px 0px;
  ${({ type }) =>
    type === 0 &&
      css`
        background-color: #f56236;
      `
  }
  ${({ type }) =>
  type === 1 &&
    css`
      background-color: #fce788;
    `
}
${({ type }) =>
type === 2 &&
  css`
    background-color: #88fca3;
  `
}
`

const StyledMessage = styled.span`
  margin: 0px 0px 0px 15px;
`

const StyledClear = styled.span`
  display: flex;
  justify-content: flex-end;
  margin: 25px 15px -15px 0px;
  font-weight: bold;
  cursor: pointer;
`