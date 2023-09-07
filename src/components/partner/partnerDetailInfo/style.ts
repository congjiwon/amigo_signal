import { styled } from 'styled-components';

export const TilteP = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export const GrayParagraph = styled.p`
  color: #999;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

export const BlackParagraph = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
`;

export const ContentParagraph = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

export const DetailInfoList = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DetailInfoBox = styled.div`
  display: inline-flex;
  padding: 18px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
`;

export const DetailInfoTegBox = styled.div`
  display: inline-flex;
  height: 56px;
  padding: 3px 16px 3px 6px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #eaeaea;
`;

export const TegImgBox = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
`;

export const TegImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
