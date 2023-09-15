import SpotBanner1 from '../../../assets/imgs/Spot/spot_share_banner.png';
import * as St from './style';

function SpotShareBanner() {
  return (
    <St.ImageWrapper $banner={`spotShare`}>
      <St.SpotMainImage src={SpotBanner1} alt="mainImage" />
      <St.SpotBannerTextBox>
        <St.SpotImageMainText>
          <span>여행의 </span>
          <span>아름다움을 함께 나눠요!</span>
        </St.SpotImageMainText>
        <St.SpotImageSubText>
          <span>Amigo Signal에 </span>
          <span>여행의 순간을 함께 공유해보세요.</span>
        </St.SpotImageSubText>
      </St.SpotBannerTextBox>
    </St.ImageWrapper>
  );
}

export default SpotShareBanner;
