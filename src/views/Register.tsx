import React from 'react'
import 'antd/dist/antd.min.css';
import RegisterForm from '../components/forms/RegisterForm';
import styled from 'styled-components'

const Register: React.FC = () => {
  return (
    <StyledContainer>
      <RegisterForm />
    </StyledContainer>
  )
}

export default Register

const StyledContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`