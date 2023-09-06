import { styled } from 'styled-components';

export const SpinnerContainer = styled.section`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0%;
  bottom: 0;
  z-index: 555;
`;

export const SpinnerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
