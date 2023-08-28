import { styled } from 'styled-components';

export const ProfileWrapper = styled.div`
  width: 100%;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProfileImgBox = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
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
    font-weight: 700;
    color: #000;
  }
  & p:nth-child(2) {
    margin-top: 4px;
    color: #81858a;
  }
`;
