import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const logoIcons: string[] = ['🍇', '🍉', '🍊', '🥭', '🍏', '🍅', '🥕', '🥝', '🥔', '🥒', '🍞', '🍈', '🍪', '🥚', '🥓', '🥩', '🧅', '🍓', '🍒', '🍐', '🍋', '🍌', '🍍'];

const fadeInFadeOut = keyframes`
    0%,100% { opacity: 0; }
    50% { opacity: 1; }
`;

const StyledFruit = styled.div`
  opacity: 0;
  width:45px;
  postion:relative;
  animation: ${fadeInFadeOut} 2s;
`;

const IconLogo: React.FC = () => {
  const [randomFruit, setRandomFruit] = useState<string>('🍪');
  const getRandomFruit = () => {
    const randomIndex = Math.floor(Math.random() * logoIcons.length);
    const randomFruitTmp = logoIcons[randomIndex];
    setRandomFruit(randomFruitTmp);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getRandomFruit();
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <StyledFruit key={randomFruit}>
      {randomFruit}
    </StyledFruit>
  );
};

export default IconLogo;
