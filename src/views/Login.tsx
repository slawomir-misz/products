import React from 'react';
import 'antd/dist/antd.min.css';
import styled from 'styled-components';
import LoginForm from '../components/loginForm/LoginForm';

const StyledWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;`;

const StyledContainer = styled.div`
  position:relative;
  width: 100%;
  max-width: 350px;`;

const Login: React.FC = () => (
  <StyledWrapper>
    <StyledContainer>
      <LoginForm />
    </StyledContainer>
  </StyledWrapper>
);

export default Login;
