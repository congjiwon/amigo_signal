import { css, styled } from 'styled-components';

// common css
const CommonMainImage = css`
  position: relative;
  display: block;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  transition: 0.5s;
`;

const CommonTextBox = css`
  position: absolute;
  top: 39%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  box-sizing: border-box;
  transition: 0.5s;

  @media screen and (max-width: 640px) {
    & span {
      display: block;
    }
  }
`;

const CommonMainText = css`
  margin-bottom: 23px;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.5;
  transition: 0.5s;

  @media (max-width: 1500px) {
    font-size: 3vw;
  }
  @media screen and (max-width: 640px) {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 20px;
  }
`;

const CommonSubText = css`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;

  @media screen and (max-width: 1500px) {
    font-size: 1.6vw;
  }
  @media screen and (max-width: 640px) {
    font-size: 12px;
    font-weight: 300;
  }
`;

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

  @media screen and (max-width: 1500px) {
    margin-bottom: 60px;
  }

  @media screen and (max-width: 640px) {
    margin-bottom: 24px;
  }
`;

// Partner Banner
export const PartnerMainImageBox = styled.div`
  & img {
    ${CommonMainImage}

    @media screen and (max-width: 1500px) {
      right: -12%;
    }

    @media screen and (max-width: 640px) {
      right: -20%;
      padding-bottom: 6vw;
    }
  }
`;

export const PartnerBannerTextBox = styled.div`
  ${CommonTextBox}

  @media screen and (max-width: 640px) {
    top: 46%;
  }
`;

export const PartnerImageMainText = styled.p`
  color: #121621;
  ${CommonMainText}
`;

export const PartnerImageSubText = styled.span`
  color: #3f4656;
  ${CommonSubText}
`;

// SpotShare Banner
export const SpotMainImageBox = styled.div`
  & img {
    ${CommonMainImage}

    @media screen and (max-width: 1500px) {
      right: -13%;
    }

    @media screen and (max-width: 640px) {
      top: 4vw;
      padding-top: 6vw;
    }
  }
`;

export const SpotBannerTextBox = styled.div`
  ${CommonTextBox}

  @media screen and (max-width: 1500px) {
    top: 24%;
  }
  @media screen and (max-width: 640px) {
    top: 7%;
  }
`;

export const SpotImageMainText = styled.p`
  color: #fff;
  ${CommonMainText}
`;

export const SpotImageSubText = styled.span`
  color: #fff;
  ${CommonSubText}
`;
