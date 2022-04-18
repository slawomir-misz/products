import React from 'react'
import 'antd/dist/antd.min.css';
import styled from 'styled-components'
import PasswordResetForm from '../components/passwordResetForm/PasswordResetForm';

const PasswordReset: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
       <PasswordResetForm />
      </StyledContainer>
    </StyledWrapper>
  )
}

export default PasswordReset

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