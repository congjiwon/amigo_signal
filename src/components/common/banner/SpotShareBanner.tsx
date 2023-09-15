import mainBannerAvif from '../../../assets/imgs/Spot/spot_share_banner.avif';
import mainBanner from '../../../assets/imgs/Spot/spot_share_banner.png';
import mainBannerWebp from '../../../assets/imgs/Spot/spot_share_banner.webp';
import * as St from './style';

function SpotShareBanner() {
  return (
    <St.ImageWrapper $banner={`spotShare`}>
      <St.SpotMainImageBox>
        <picture>
          <source srcSet={mainBannerAvif} type="image/avif" />
          <source srcSet={mainBannerWebp} type="image/webp" />
          <img src={mainBanner} alt="스팟 쉐어 메인 배너 이미지" />
        </picture>
      </St.SpotMainImageBox>
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
