import { Snackbar } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import generateMessage, { Message } from './Api';
import Board from './Board';
import ButtonStyle from './ButtonStyle';

const App: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [runningMessage, setRunningMessage] = useState(true)
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorIndex, setErrorIndex] = useState<number[]>([])

  useEffect(() => {
    if (runningMessage) {
      const cleanUp = generateMessage((message: Message) => {
        setMessages(oldMessages => [...oldMessages, message]);
      });
      return cleanUp;
    }
  }, [setMessages, runningMessage]);

  const stopMessage = useCallback(() => {
    setRunningMessage(!runningMessage)
  },[setRunningMessage, runningMessage])

  const clearMessages = () => {
    setMessages([])
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const showNotification = useCallback(() => {
    const setMessageError = messages.map((value, index) => {
      return {
        ...value,
        index
      }
    }).sort((a,b) => b.index - a.index).find((item) => item.priority === 0 && !errorIndex.includes(item.index))
    if (setMessageError) {
      setOpen(true)
      setErrorIndex(oldIndex => [...oldIndex, setMessageError.index])
      setErrorMessage(setMessageError.message)
    }
  },[messages, setOpen, setErrorMessage, setErrorIndex, errorIndex])

  useEffect(() => {
    showNotification()
  }, [showNotification])

  return (
    <div>
      <StyledTitle>nunffsaid.com Coding Challenge</StyledTitle>
      <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} onClose={handleClose}>
        <StyledContentSnack>
          {errorMessage}
          <StyledCloseSnack onClick={handleClose}>X</StyledCloseSnack>
        </StyledContentSnack>
      </Snackbar>
      <StyledContainerButton>
        <ButtonStyle label={runningMessage ? 'STOP' : 'START'} onClick={stopMessage} />
        <ButtonStyle label="CLEAR" onClick={clearMessages} />
      </StyledContainerButton>
        <Board updatedMessage={setMessages} information={messages} />
      <StyledContainerBoard>
      </StyledContainerBoard>
    </div>
  );
}

const StyledTitle = styled.h1`
  color: #000;
`

const StyledContainerButton = styled.div`
  display: flex;
  justify-content: center;
`

const StyledContainerBoard = styled.div`
  margin: 50px 0px 0px 0px;
`

const StyledContentSnack = styled.div`
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  background-color: #f56236;
  display: flex;
  padding: 6px 16px;
`

const StyledCloseSnack = styled.span`
  margin-left: 15px;
  cursor: pointer;
  font-weight: bold;
`

export default App;
