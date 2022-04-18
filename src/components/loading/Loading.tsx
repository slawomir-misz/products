import React from 'react'
import styled from 'styled-components'
import IconLogo from '../iconLogo/IconLogo'

const Loading: React.FC = () => {
  return (
    <StyledContainer><IconLogo /></StyledContainer>
  )
}

export default Loading

const StyledContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;`
