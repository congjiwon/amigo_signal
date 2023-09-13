import { styled } from 'styled-components';
import mainBanner from '../../../assets/imgs/partner/partnerPostBanner.png';

type bannerProps = {
  $banner: 'partner' | 'spotShare';
};

export const ImageWrapper = styled.div<bannerProps>`
  position: relative;
  width: 100%;
  min-width: 360px;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 100px;
  background: ${(props) => (props.$banner === 'partner' ? 'linear-gradient(0deg, #d9daee 0%, rgba(227, 233, 243, 0) 100%)' : '#121621')};
`;

export const PartnerMainImage = styled.img`
  display: block;
  width: 50%;
  max-width: 1065px;
  margin-left: auto;
  padding-bottom: 4vw;
`;

export const PartnerBannerTextBox = styled.div`
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const PartnerImageMainText = styled.p`
  margin-bottom: 23px;
  color: #121621;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.5;

  @media (max-width: 1400px) {
    font-size: 3vw;
  }
`;

export const PartnerImageSubText = styled.span`
  color: #3f4656;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;

  @media (max-width: 1400px) {
    font-size: 1.6vw;
  }
`;

// SpotShare Banner
export const SpotMainImage = styled.img`
  display: block;
  width: 60%;
  max-width: 1065px;
  margin-left: auto;
  padding-top: 4vw;
`;

export const SpotBannerTextBox = styled.div`
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const SpotImageMainText = styled.p`
  margin-bottom: 23px;
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.5;

  @media (max-width: 1400px) {
    font-size: 3vw;
  }
`;

export const SpotImageSubText = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;

  @media (max-width: 1400px) {
    font-size: 1.6;
  }
`;
