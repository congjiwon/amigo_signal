import TravelWith from '../../../assets/imgs/partner/TravelWith.jpg';
import * as St from './style';

function SpotShareBanner() {
  return (
    <St.ImageWrapper>
      <St.MainImage src={TravelWith} alt="mainImage" />
      <St.ImageMainText>친구와 함께라면 더 즐겁지 않을까요?</St.ImageMainText>
      <St.ImageSubText>
        Amigo Signal과 함께 여행에 동행할 친구를 찾아보세요.
        <br />
        여행이 더 즐거워질 거에요.
      </St.ImageSubText>
    </St.ImageWrapper>
  );
}

export default SpotShareBanner;
