import { styled } from 'styled-components';

export const UserFeedbackBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px #eaeaea solid;
`;

export const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserProfileImgBox = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  @media (max-width: 500px) {
    width: 30px;
    height: 30px;
  }
`;

export const UserProfileImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const GrayParagraph = styled.p`
  color: #999;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const UserInfoBox = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  font-style: normal;
  line-height: 150%;
`;

export const BlackParagraph = styled.p`
  color: #000;
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const UserInfoParagraph = styled.p`
  color: #6c7486;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 500px) {
    gap: 10px;
  }
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    &:hover {
      color: #643bdc;
      transform: scale(1.2);
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    &:not(:hover) {
      transition: 0.3s ease-out;
    }
  }

  .kakaoIcon {
    width: 22px;
    height: 22px;
    @media (max-width: 500px) {
      width: 18px;
      height: 18px;
    }
  }

  .lineIcon {
    width: 24px;
    height: 24px;
    @media (max-width: 500px) {
      width: 20px;
      height: 20px;
    }
  }

  .fillIcon {
    width: 24px;
    height: 24px;
    color: #643bdc;
    @media (max-width: 500px) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Icons = {
  height: '24px',
  width: '24px',
};
