import { styled } from 'styled-components';

export const ApplyDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ApplyStatus = styled.div`
  padding: 5px;
  background-color: #ffb67c;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 12px;
`;

export const ModalTitle = styled.h1`
  padding-left: 50px;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const TextCount = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 45px;
  font-size: 12px;
  color: gray;
`;

export const SubmitApply = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 45px;
`;

export const ApplicantList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 85%;
  margin: 0px auto;
  margin-top: 30px;
`;

export const ApplicantCard = styled.li`
  width: 100%;
  border: 1px solid gray;
`;
