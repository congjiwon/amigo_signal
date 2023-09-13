import { styled } from 'styled-components';

type StyledStatusProps = {
  $validationStatusColor?: boolean;
};
type StyledValidationProps = {
  $validationStatus?: boolean;
};

export const SignUpSection = styled.section`
  width: 100%;
  padding: 90px 20px 100px;
  background-color: #e3e9f3;
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

  @media screen and (max-width: 400px) {
    padding: 64px 20px 56px 20px;
  }
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

export const Input = styled.input<StyledValidationProps>`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid
    ${(props) => {
      const { $validationStatus } = props;
      if ($validationStatus === undefined) return '#E3E9F3';
      if ($validationStatus === true) return '#121621';
      if ($validationStatus === false) return '#f00';
    }};

  &:focus {
    outline: none;
  }
`;

export const ValidationMsgBox = styled.div<StyledStatusProps>`
  height: 21px;
  margin-top: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => !props.$validationStatusColor && '#f00'};
`;

export const GenderRow = styled.div`
  & .gender-inputs {
    display: flex;
    gap: 16px;

    & > div {
      flex: 1 0 auto;
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
    height: 36px;
    border: 1px solid #e8ebee;
    font-size: 14px;
    color: #adb1b8;
    border-radius: 8px;
    cursor: pointer;
  }

  & input:checked + label {
    color: #121621;
    border-color: #121621;
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
    background-color: #643bdc;
    border: 0;
    border-radius: 10px;
    cursor: pointer;

    &:disabled {
      background-color: #99a3ba;
      cursor: not-allowed;
    }
  }
`;
