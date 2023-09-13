import SpotBanner1 from '../../../assets/imgs/Spot/spotShareBanner.png';
import * as St from './style';

function SpotShareBanner() {
  return (
    <St.ImageWrapper $banner={`spotShare`}>
      <St.SpotMainImage src={SpotBanner1} alt="mainImage" />
      <St.SpotBannerTextBox>
        <St.SpotImageMainText>여행의 아름다움을 함께 나눠요!</St.SpotImageMainText>
        <St.SpotImageSubText>Amigo Signal에 여행의 순간을 함께 공유해보세요.</St.SpotImageSubText>
      </St.SpotBannerTextBox>
    </St.ImageWrapper>
  );
}

export default SpotShareBanner;
