import { styled } from 'styled-components';

type StyledStatusProps = {
  $validationStatusColor: boolean;
};

export const SignUpSection = styled.section`
  width: 100%;
  padding: 90px 20px 100px;
  background-color: #e8ebee;
  box-sizing: border-box;
`;

export const SignUpLayout = styled.div`
  min-width: 320px;
  max-width: 400px;
  margin: 0 auto;
`;

export const SignUpTitle = styled.h2`
  margin-bottom: 32px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
`;

export const SignUpInputsBox = styled.div`
  width: 100%;
  padding: 64px 40px 56px 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
`;

export const FormRow = styled.div`
  margin-bottom: 16px;

  & .label-text {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const ValidationMsgBox = styled.div<StyledStatusProps>`
  height: 22px;
  margin-top: 8px;
  font-size: 14px;
  color: ${(props) => (props.$validationStatusColor ? 'green' : 'red')};
`;

export const GenderRow = styled.div`
  margin-bottom: 38px;

  & .gender-inputs {
    display: flex;
    gap: 16px;

    & > div {
      flex: 1 0 auto;
      height: 36px;
      border: 1px solid #e8ebee;
      border-radius: 10px;
    }
  }

  & input[type='radio'] {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
  }

  & label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 14px;
    color: #adb1b8;
    border-radius: 10px;
    cursor: pointer;
  }

  & input:checked + label {
    color: #fff;
    background-color: #000;
  }
`;

export const BtnSignUpBox = styled.div`
  width: 100%;
  margin-top: 24px;

  & button {
    display: block;
    width: 100%;
    height: 56px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: #000;
    border: 0;
    border-radius: 10px;
    cursor: pointer;

    &:disabled {
      background-color: #adb1b8;
      cursor: not-allowed;
    }
  }
`;
