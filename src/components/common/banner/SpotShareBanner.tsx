import SpotBanner1 from '../../../assets/imgs/Spot/SpotBanner1.jpg';
import * as St from './style';

function SpotShareBanner() {
  return (
    <St.ImageWrapper>
      <St.MainImage src={SpotBanner1} alt="mainImage" />
      <St.SpotImageMainText>여행의 아름다움을 함께 나누는 공간!</St.SpotImageMainText>
      <St.SpotImageSubText>Amigo Signal과 함께 여행의 순간을 함께 공유하세요.</St.SpotImageSubText>
    </St.ImageWrapper>
  );
}

export default SpotShareBanner;
