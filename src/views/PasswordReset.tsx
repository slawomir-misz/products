import React from 'react';
import 'antd/dist/antd.min.css';
import styled from 'styled-components';
import PasswordResetForm from '../components/passwordResetForm/PasswordResetForm';

const StyledWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const StyledContainer = styled.div`
  position:relative;
  width: 100%;
  max-width: 350px;
`;

const PasswordReset: React.FC = () => (
  <StyledWrapper>
    <StyledContainer>
      <PasswordResetForm />
    </StyledContainer>
  </StyledWrapper>
);

export default PasswordReset;
