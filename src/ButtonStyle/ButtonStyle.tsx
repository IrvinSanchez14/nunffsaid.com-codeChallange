import React from 'react';
import styled from 'styled-components';

interface IButtonProps {
  label: string;
  onClick: () => void
}

export const ButtonStyle: React.FC<IButtonProps> = ({ label, onClick}) => {
  return(
    <StyledContainer>
      <StyledButton onClick={onClick}>{label}</StyledButton>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  margin: 0px 5px 0px 0px;
`

const StyledButton = styled.button`
  background-color: #88fca3;
  font-weight: bold;
  border: none;
  padding: 7px 15px 7px 15px;
  border-radius: 4px;
  box-shadow: 0 3px 2px rgb(0 0 0 / 20%);
  cursor: pointer;

  &:active {
    background-color: #88fca3;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`