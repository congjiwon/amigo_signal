import { styled } from 'styled-components';

export const DetailSection = styled.section`
  margin-top: 100px;
  margin-bottom: 89px;
  @media (max-width: 1256px) {
    padding: 0 50px 0 50px;
  }
  @media (max-width: 500px) {
    margin-top: 40px;
    padding: 0px 20px 0px 20px;
  }
`;

export const GraySpan = styled.span`
  color: var(--gray2, #6c7486);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

export const NickNameSpan = styled.span`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const BlackSpan = styled.span`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 20px;
  @media (max-width: 500px) {
    gap: 10px;
  }
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
  }
`;

export const TitleBox = styled.div`
  p {
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    @media (max-width: 500px) {
      font-size: 18px;
    }
  }
`;

export const InfoOuterBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 32px;
  padding: 32px 0 24px 0;
  border-bottom: 1px solid #e3e9f3;
  @media (max-width: 500px) {
    margin-bottom: 24px;
    padding: 32px 0 20px 0;
  }
`;

export const PostInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  @media (max-width: 500px) {
    width: 30px;
    height: 30px;
  }
`;

export const DetailInfoList = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  @media (max-width: 500px) {
    gap: 8px;
  }
`;

export const DetailInfoBox = styled.div`
  display: inline-flex;
  padding: 18px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--light-gray, #e3e9f3);
  @media (max-width: 500px) {
    padding: 10px 16px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--gray, #99a3ba);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  @media (max-width: 500px) {
    gap: 10px;
    font-size: 12px;
  }
`;

export const SpotShareBox = styled.div`
  & strong {
    font-weight: 700;
  }

  & em {
    font-style: italic;
  }

  & a {
    text-decoration: underline;
    color: #06c;
  }

  margin-top: 56px;
`;

export const AddressBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 16px;

  @media (max-width: 1200px) {
    margin-left: 20px;
    margin-right: 20px;
  }

  .markerIcon {
    width: 24px;
    height: 24px;
  }

  .span {
    color: #000;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.3px;
  }
`;
