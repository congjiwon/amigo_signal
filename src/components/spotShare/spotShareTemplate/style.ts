import { styled } from 'styled-components';

export const FormContainer = styled.div`
  margin-top: 131px;
  margin-bottom: 120px;
  @media (max-width: 1256px) {
    margin-top: 70px;
    margin-bottom: 70px;
  }
  @media (max-width: 500px) {
    margin-top: 48px;
    margin-bottom: 104px;
  }
`;

export const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 1256px) {
    padding: 0px 50px 0px 50px;
  }
  @media (max-width: 500px) {
    padding: 0px 20px 0px 20px;
  }
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
  .UpdateLocationDropDown,
  .LocationDropDown,
  .UpdateSpotCalendar,
  .SpotCalendar {
    width: 384px;
    @media (max-width: 1047px) {
      width: 184px;
    }
    @media (max-width: 500px) {
      width: 335px;
    }
  }
  .UpdateStarRate,
  .StarRate {
    color: #643bdc;
  }
  @media screen and (max-width: 650px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 8px;

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
    @media (max-width: 500px) {
      padding: 16px 31px;
    }
  }

  .CancelBtn {
    background-color: #e3e9f3;
  }
  .SubmitBtn {
    background-color: #643bdc;
    color: white;
  }
`;
