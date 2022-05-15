import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Alert } from 'antd';
import { fadeInUp } from 'react-animations';

interface ErrorProps {
  message: string
  dispatchErrorState: any
}

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const StyledAlert = styled.div`
  top: -64px;
  width: 100%;
  position: absolute;
  animation: 1s ${fadeInUpAnimation};
`;

const ErrorPopUp = ({ message, dispatchErrorState }: ErrorProps) => {
  const handleClose = () => {
    dispatchErrorState('');
  };

  return (
    <StyledAlert>
      <Alert
        message={message}
        type="error"
        closable
        onClose={() => handleClose()}
      />
    </StyledAlert>
  );
};

export default ErrorPopUp;
