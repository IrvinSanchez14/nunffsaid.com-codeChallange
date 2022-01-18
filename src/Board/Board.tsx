import React from "react";
import styled from "styled-components";
import { Message, Priority } from "../Api";
import Card from "../Card";

export interface IBodyProps {
  index: number;
  message: string;
  priority: Priority;
}

interface IColumnProps {
  title: string
  count: number
  body: IBodyProps[]
  onDelete: (index: number) => void
}

interface IBoardProps {
  information: Message[]
  updatedMessage: React.Dispatch<React.SetStateAction<Message[]>>
}

const ColumnBoard: React.FC<IColumnProps> = ({ title, count, body, onDelete }) => {
  return(
    <StyledContainerColumn>
      <div>{title}</div>
      <div>{`Count ${count}`}</div>
      {body?.sort((a,b) => b.index - a.index).map?.(msg => <Card key={msg.index} id={msg.index} message={msg.message} option={msg.priority} onClear={onDelete} />)}
    </StyledContainerColumn>
  )
}

export const Board: React.FC<IBoardProps> = ({ information, updatedMessage }) => {

  const clearOneCard = (index:number) => {
    const ess = information.filter((_, i) => i !== index);
    updatedMessage(ess)
  }

  const dataError = information.map((value, index) => {
    return {
      ...value,
      index
    }
  }).filter((item) => item.priority === 0)

  const dataWarning = information.map((value, index) => {
    return {
      ...value,
      index
    }
  }).filter((item) => item.priority === 1)

  const dataInfo = information.map((value, index) => {
    return {
      ...value,
      index
    }
  }).filter((item) => item.priority === 2)

  return (
    <StyledContainer>
      <ColumnBoard title="Error Type 1" count={dataError.length} body={dataError} onDelete={clearOneCard} />
      <ColumnBoard title="Warning Type 2" count={dataWarning.length} body={dataWarning} onDelete={clearOneCard} />
      <ColumnBoard title="Info Type 3" count={dataInfo.length} body={dataInfo} onDelete={clearOneCard} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 45px 45px 0px 45px;
`

const StyledContainerColumn = styled.div`
  width: 100%;
  margin: 0px 0px 0px 20px;
`
