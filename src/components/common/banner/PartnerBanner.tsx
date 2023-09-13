import mainBanner from '../../../assets/imgs/partner/partnerPostBanner.png';
// import
import * as St from './style';

function PartnerBanner() {
  return (
    <St.ImageWrapper $banner={`partner`}>
      <St.PartnerMainImage src={mainBanner} alt="동행 찾기 매인 배너 이미지" />
      <St.PartnerBannerTextBox>
        <St.PartnerImageMainText>친구와 함께라면 더 즐겁지 않을까요?</St.PartnerImageMainText>
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
