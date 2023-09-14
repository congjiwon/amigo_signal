import { styled } from 'styled-components';

export const FormContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
`;

export const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SelectListBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .LocationDropDown,
  .SpotCalendar {
    width: 384px;
  }

  .StarRate {
    color: #643bdc;
  }

  @media screen and (max-width: 650px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;

    & :where(.css-dev-only-do-not-override-byeoj0).ant-space-vertical {
      margin-left: 0 !important;
    }
  }
`;

export const SpotShareTitleInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;

  .CancelBtn,
  .SubmitBtn {
    width: 140px;
    height: 56px;
    padding: 16px 20px;
    margin-top: 32px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .CancelBtn {
    background-color: #e3e9f3;
  }
  .SubmitBtn {
    background-color: #643bdc;
    color: white;
  }
`;
