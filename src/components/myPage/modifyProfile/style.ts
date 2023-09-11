import { css, styled } from 'styled-components';

type ValidationStatusProps = {
  $validationStatus: boolean;
};

export const ModifyProfileWrapper = styled.div`
  width: 304px;
  margin: 72px auto;
`;

export const ModifyProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ProfileImgBox = styled.div`
  position: relative;
  width: 120px;
  height: 120px;

  & #profileImg {
    display: none;
  }
`;

export const PreviewProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileImgLabel = styled.label`
  position: absolute;
  width: 46px;
  bottom: -10px;
  right: -3px;

  cursor: pointer;

  & > img {
    width: 100%;
  }
`;

export const MofifyNickNameMsg = styled.p<ValidationStatusProps>`
  color: ${(props) => (props.$validationStatus ? 'green' : 'red')};
  font-size: 14px;
`;

export const ProfileNicknameLabelBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  & label {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const ProfileNicknameInput = styled.input`
  width: 100%;
  margin-top: 8px;
  padding: 14px 20px;
  border: 1px solid #e8ebee;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 500;
  color: #81858a;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 64px;
`;

export const Btn = styled.button<{ $width: string; $height: string; $bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 0;
  color: #fff;
  cursor: pointer;

  ${(props) => {
    return css`
      width: ${props.$width};
      height: ${props.$height};
      background-color: ${props.$bgColor};
    `;
  }}

  &:disabled {
    background-color: #6c7486;
    cursor: not-allowed;
  }
`;
