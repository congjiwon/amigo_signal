import { styled } from 'styled-components';

export const H2 = styled.h2`
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
  gap: 10px;
`;

export const UserProfileImgBox = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

export const DetailInfoList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DetailInfoBox = styled.div`
  display: inline-flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
`;

export const ApplicantTitle = styled.h1`
  padding-left: 50px;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const ApplicantList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 85%;
  margin: 0px auto;
  margin-top: 30px;
`;

export const ApplicantCard = styled.li`
  width: 100%;
  border: 1px solid gray;
`;
