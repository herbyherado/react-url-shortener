import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <Wrapper>
      {new Array(4).fill('').map((wave: string, index) => (
        <Wave index={index + 1} />
      ))}
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: #073042;
`;

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(0);
  }

  40% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1.1);
  }
`;

const Wave = styled.div<{ index: number }>`
  position: absolute;
  width: 50%;
  height: 0;
  top: 50%;
  left: 25%;
  opacity: 0;
  border: 1.5px solid #3ddc84;
  animation: ${pulse} 2.5s infinite ease-in-out;

  :nth-child(${props => props.index}) {
    animation-delay: ${props => `${props.index * 0.5}s`};
  }
`;
