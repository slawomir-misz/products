import React from 'react'
import 'antd/dist/antd.min.css';
import LoginForm from '../components/forms/LoginForm';
import styled from 'styled-components'

const Login: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <LoginForm />
      </StyledContainer>
    </StyledWrapper>
  )
}

export default Login

const StyledWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
const StyledContainer = styled.div`
  position:relative;
  width: 100%;
  max-width: 350px;
`