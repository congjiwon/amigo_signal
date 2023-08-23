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
  gap: 10px;
`;

export const UserProfileImgBox = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
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
`;

export const BlackParagraph = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
`;
