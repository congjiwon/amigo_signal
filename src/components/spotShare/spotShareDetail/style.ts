import { styled } from 'styled-components';

export const DetailSection = styled.section``;

export const DetailInfoBox = styled.div`
  display: inline-flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
  margin-right: 16px;
  margin-bottom: 56px;
`;

export const WriterInfoBox = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  text-align: right;
  margin: 0px 47px 47px 0px;
  span {
    font-size: 13px;
    margin-left: 10px;
  }
`;
export const GraySpan = styled.span`
  color: #999;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const NickNameSpan = styled.span`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export const BlackSpan = styled.span`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 20px;
  button {
    background-color: transparent;
    border: none;
    &:hover {
      color: #670fdf;
      transform: scale(1.2);
      transition: transform 0.3s ease;
    }
    &:not(:hover) {
      transition: 0.3s ease-out;
    }
    cursor: pointer;
    .lineIcon {
      width: 24px;
      height: 24px;
    }

    .fillIcon {
      width: 24px;
      height: 24px;
      color: #643bdc;
    }
  }
`;

export const TitleBox = styled.div`
  border-radius: 50px;
  margin: 100px 0px 25px 0px;
  height: 36px;
  p {
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }
`;

export const InfoOuterBox = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 2px solid #efefef;
`;

export const PostInfoBox = styled.div`
  height: 40px;
  display: flex;
`;

export const LocationIngoSpan = styled.span`
  color: #000;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.3px;
`;

export const InfoInnerBox = styled.div`
  margin-left: 12px;
  height: 40px;
  span {
    display: inline-block;
    height: 20px;
    font-size: 14px;
  }
`;

export const InfoContainer = styled.div`
  span {
    margin-right: 16px;
    color: var(--gray, #adb1b8);
    font-size: 14px;
  }
`;

export const SpotShareBox = styled.div`
  & strong {
    font-weight: 700;
  }

  & em {
    font-style: italic;
  }
  padding-top: 32px;
  padding-bottom: 130px;
  position: relative;
`;

export const Heart = {
  height: '24px',
  width: '24px',
};
