import TravelWith from '../../../assets/imgs/partner/TravelWith.jpg';
// import
import * as St from './style';

function PartnerBanner() {
  return (
    <St.ImageWrapper>
      <St.MainImage src={TravelWith} alt="mainImage" />
      <St.PartnerImageMainText>함께하는 여행이 더 즐겁지 않을까요?</St.PartnerImageMainText>
      <St.PartnerImageSubText>
        Amigo Signal과 여행을 함께할 동행을 찾아보세요.
        <br />
        여행이 더 즐거워질 거에요.
      </St.PartnerImageSubText>
    </St.ImageWrapper>
  );
}

export default PartnerBanner;
