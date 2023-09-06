import { styled } from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 360px;
  max-width: 100%;
  height: 400px;
  overflow: hidden;
`;

export const MainImage = styled.img`
  position: absolute;
  width: 100%;
  /* width: 1920px; */
  transform: translate(0%, -20%);
`;

export const ImageMainText = styled.span`
  position: absolute;
  bottom: 55%;
  left: 5%;
  color: black;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const ImageSubText = styled.span`
  position: absolute;
  bottom: 45%;
  left: 5%;
  color: black;
  font-size: 0.8rem;
`;
