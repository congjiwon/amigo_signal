import { styled } from 'styled-components';

export const Title = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  word-break: break-all;
  /* max-width: 791px; */
  @media (max-width: 500px) {
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }
`;

export const GrayParagraph = styled.p`
  color: #999;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 21px */
`;

export const BlackParagraph = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 21px */
`;

export const ContentParagraph = styled.p`
  padding: 0px 5px 0px 5px;
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  word-break: break-all;
`;

export const DetailInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 56px;
  @media (max-width: 500px) {
    gap: 8px;
    margin-top: 24px;
    margin-bottom: 48px;
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

export const DetailInfoTegBox = styled.div`
  display: flex;
  padding: 3px 16px 3px 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #eaeaea;
  @media (max-width: 500px) {
    height: 40px;
    padding: 0px 16px 0px 6px;
  }
`;

export const TegImgBox = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  @media (max-width: 500px) {
    width: 40px;
    height: 40px;
  }
`;

export const TegImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
