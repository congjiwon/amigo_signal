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

export const PartnerImageMainText = styled.span`
  position: absolute;
  bottom: 55%;
  left: 19%;
  color: black;
  font-size: 1.4rem;
  font-weight: bold;
  @media (max-width: 850px) {
    bottom: 55%;
    left: 12%;
    font-size: 0.7rem;
  }
`;

export const PartnerImageSubText = styled.span`
  position: absolute;
  bottom: 45%;
  left: 19%;
  color: black;
  font-size: 0.8rem;
  @media (max-width: 850px) {
    bottom: 45%;
    left: 12%;
    font-size: 0.5rem;
  }
`;

export const SpotImageMainText = styled.span`
  position: absolute;
  bottom: 55%;
  left: 62%;
  color: black;
  font-size: 1.4rem;
  font-weight: bold;
  @media (max-width: 850px) {
    bottom: 55%;
    left: 62%;
    font-size: 0.7rem;
  }
`;

export const SpotImageSubText = styled.span`
  position: absolute;
  bottom: 48%;
  left: 62%;
  color: black;
  font-size: 0.8rem;
  @media (max-width: 850px) {
    bottom: 48%;
    left: 62%;
    font-size: 0.5rem;
  }
  @media (max-width: 560px) {
    bottom: 43%;
    left: 62%;
    font-size: 0.5rem;
  }
`;
