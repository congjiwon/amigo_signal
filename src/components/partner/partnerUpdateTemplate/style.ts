import { styled } from 'styled-components';

export const FormContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SelectListBox = styled.div`
  display: flex;
  gap: 24px;
`;

export const ExplanationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WriteInput = styled.input`
  height: 48px;
  padding-left: 16px;
  border-radius: 10px;
  border: 1px solid var(--light-gray, #e8ebee);
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  height: 400px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--light-gray, #e8ebee);
  resize: none;
`;

export const TegBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const TegButton = styled.button`
  display: inline-flex;
  height: 56px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--light-gray, #e8ebee);
`;

export const TegImgBox = styled.div`
  width: 34px;
  height: 34px;
  overflow: hidden;
`;

export const TegImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;
