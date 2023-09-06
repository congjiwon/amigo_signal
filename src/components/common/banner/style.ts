import { styled } from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 360px;
  max-width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 100px;

  @media (max-width: 850px) {
    max-height: 200px;
    margin-bottom: 20px;
  }
`;

export const MainImage = styled.img`
  position: absolute;
  width: 100%;
  object-fit: cover;
  transform: translate(0%, -20%);
`;

export const ImageMainText = styled.span`
  position: absolute;
  bottom: 55%;
  left: 5%;
  color: black;
  font-size: 1.4rem;
  font-weight: bold;
  @media (max-width: 850px) {
    bottom: 55%;
    left: 2%;
    font-size: 0.7rem;
  }
`;

export const ImageSubText = styled.span`
  position: absolute;
  bottom: 45%;
  left: 5%;
  color: black;
  font-size: 0.8rem;
  @media (max-width: 850px) {
    bottom: 45%;
    left: 2%;
    font-size: 0.5rem;
  }
`;
