import { styled } from 'styled-components';

export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 60px auto;
  padding: 32px;
  background-color: #eee;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const ProfileImgBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
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
