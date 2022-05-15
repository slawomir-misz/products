import React from 'react';
import styled from 'styled-components';
import IconLogo from '../iconLogo/IconLogo';

const StyledContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;`;

const Loading: React.FC = () => (
  <StyledContainer><IconLogo /></StyledContainer>
);

export default Loading;
