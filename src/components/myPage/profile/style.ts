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
  width: 150px;

  & img {
    width: 100%;
  }
`;
