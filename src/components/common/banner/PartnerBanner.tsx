import { styled } from 'styled-components';
import * as St from './style';
import TravelWith from '../../../assets/imgs/partner/TravelWith.jpg';

function Banner() {
  return (
    <ImageWrapper>
      <MainImage src={TravelWith} alt="mainImage" />
      <ImageMainText>친구와 함께라면 더 즐겁지 않을까요?</ImageMainText>
      <ImageSubText>
        Amigo Signal과 함께 여행에 동행할 친구를 찾아보세요.
        <br />
        여행이 더 즐거워질 거에요.
      </ImageSubText>
    </ImageWrapper>
  );
}

export default Banner;

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
