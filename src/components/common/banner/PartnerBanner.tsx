import mainBannerAvif from '../../../assets/imgs/partner/partner_post_banner.avif';
import mainBanner from '../../../assets/imgs/partner/partner_post_banner.png';
import mainBannerWebp from '../../../assets/imgs/partner/partner_post_banner.webp';
import * as St from './style';

function PartnerBanner() {
  return (
    <St.ImageWrapper $banner={`partner`}>
      <St.PartnerMainImageBox>
        <picture>
          <source srcSet={mainBannerAvif} type="image/avif" />
          <source srcSet={mainBannerWebp} type="image/webp" />
          <img src={mainBanner} alt="동행 찾기 메인 배너 이미지" />
        </picture>
      </St.PartnerMainImageBox>
      <St.PartnerBannerTextBox>
        <St.PartnerImageMainText>
          <span>친구와 함께라면 </span>
          <span>더 즐겁지 않을까요?</span>
        </St.PartnerImageMainText>
        <St.PartnerImageSubText>
          Amigo Signal과 여행을 함께할 동행을 찾아보세요.
          <br />
          여행이 더 즐거워질 거에요.
        </St.PartnerImageSubText>
      </St.PartnerBannerTextBox>
    </St.ImageWrapper>
  );
}

export default PartnerBanner;
