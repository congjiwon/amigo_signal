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

export const MainBannerBox = styled.div`
  position: absolute;
  width: 100%;
  max-width: 1200px;
  bottom: 55%;
  left: 52%;
  transform: translateX(-50%);
  @media (max-width: 850px) {
    bottom: 51%;
  }
`;

export const ImageMainText = styled.p`
  margin-bottom: 16px;
  color: black;
  font-size: 1.4rem;
  font-weight: bold;
  @media (max-width: 850px) {
    font-size: 0.7rem;
  }
`;

export const ImageSubText = styled.span`
  color: black;
  font-size: 0.8rem;
  line-height: 1.6;
  @media (max-width: 850px) {
    font-size: 0.5rem;
  }
`;
