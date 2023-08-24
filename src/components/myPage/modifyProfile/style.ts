import { styled } from 'styled-components';

export const ModifyProfileWrapper = styled.div`
  padding: 32px;
  box-sizing: border-box;
  border: 1px solid red;

  & h2 {
    margin-bottom: 16px;
    font-weight: 700;
    text-align: center;
  }
`;

export const ModifyProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ProfileImgBox = styled.div`
  width: 150px;
  flex-shrink: 0;

  & img {
    width: 100%;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
