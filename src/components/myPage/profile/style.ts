import { styled } from 'styled-components';

export const ProfileWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 33px;
  padding: 0 8px;

  & button {
    position: absolute;
    top: -30px;
    right: 0;
    background-color: transparent;
    border: 0;
    color: red;
    cursor: pointer;
  }

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
    transform: translate(-50%, -50%);
  }
`;

export const ProfileInfo = styled.div`
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
`;
