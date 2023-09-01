import { styled } from 'styled-components';

type ValidationStatusProps = {
  $validationStatus: boolean;
};

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
  position: relative;
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
  }
`;

export const MofifyNickNameMsg = styled.p<ValidationStatusProps>`
  margin-top: 8px;
  color: ${(props) => (props.$validationStatus ? 'green' : 'red')};
  font-size: 14px;
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
