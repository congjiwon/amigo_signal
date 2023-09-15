import { styled } from 'styled-components';

export const SignInSection = styled.section`
  width: 100%;
  padding: 100px 20px;
  background-color: #e8ebee;
  box-sizing: border-box;
`;

export const SignInLayout = styled.div`
  min-width: 320px;
  max-width: 400px;
  margin: 0 auto;
`;

export const SignInTitle = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
`;

export const SignInInputsBox = styled.div`
  width: 100%;
  padding: 56px 40px 72px 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;

  & > div:first-of-type {
    margin-bottom: 24px;
  }
`;

export const SignInInputBox = styled.div`
  position: relative;

  & label {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }

  & input {
    width: 100%;
    height: 48px;
    padding: 9px 20px;
    border-radius: 10px;
    border: 1px solid #e8ebee;
    box-sizing: border-box;

    &.active-reset-btn {
      & + .btn-reset {
        display: flex;
      }
    }

    & + .btn-reset {
      position: absolute;
      right: 18px;
      bottom: 12px;
      display: none;
      align-items: center;
      padding: 0;
      background-color: transparent;
      border: 0;
      outline: none;
      cursor: pointer;

      & svg {
        font-size: 24px;
        fill: #3f4656;
        color: #fff;
      }
    }
  }
`;

export const JoinBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;

  & p {
    font-size: 14px;
    color: #81858a;
  }

  & a {
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BtnSignInBox = styled.div`
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
      background-color: #adb1b8;
      cursor: not-allowed;
    }
  }
`;
