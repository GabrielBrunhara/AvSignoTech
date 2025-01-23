import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 5px solid rgba(0, 0, 0, 0.2);
    border-top: 5px solid var(--accent);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;
