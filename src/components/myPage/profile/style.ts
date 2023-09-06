import { styled } from 'styled-components';

export const ProfileWrapper = styled.div`
  width: 100%;
  margin-bottom: 33px;
  padding: 0 8px;

  @media screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const ProfileBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
`;

export const ProfileImgBox = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  flex: 0 0 60px;
  border-radius: 50%;
  overflow: hidden;

  & img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
  }
`;

export const ProfileInfo = styled.div`
  flex-grow: 1;

  & p {
    font-size: 14px;
    font-weight: 600;
    color: #000;
    line-height: 1.5;
  }

  & p:nth-child(2) {
    margin-top: 4px;
    color: #81858a;
  }

  & :where(.css-dev-only-do-not-override-byeoj0).ant-skeleton .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph {
    margin-block-start: 14px;
  }
`;
