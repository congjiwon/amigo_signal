import { styled } from 'styled-components';

export const H2 = styled.h2`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export const grayParagraph = styled.p`
  color: #999;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

export const blackParagraph = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
`;

export const contentParagraph = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

export const userFeedbackBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px #eaeaea solid;
`;

export const userProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const userProfileImgBox = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

export const detailInfoList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const detailInfoBox = styled.div`
  display: inline-flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
`;
