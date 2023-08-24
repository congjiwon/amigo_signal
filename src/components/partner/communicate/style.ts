import { styled } from 'styled-components';

type ApplicantCardProps = {
  isClicked: boolean;
};

type CheckButtonProps = {
  isAccepted: boolean | null;
};

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
  margin-right: 50px;
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
  width: 90%;
  margin: 0px auto;
  margin-top: 30px;
`;

export const ApplicantCard = styled.div<ApplicantCardProps>`
  margin-top: 15px;
  padding: 20px;
  border: ${(props) => (props.isClicked ? '1.5px solid black' : '1px solid lightgray')};
  border-radius: 10px;
`;

export const ApplicantProfile = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ApplicantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const ApplicantProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const ApplicantNickName = styled.p`
  margin-left: 5px;
  font-weight: bold;
  font-size: 1rem;
`;

export const ApplicantAgeGender = styled.p`
  margin-left: 10px;
  color: gray;
`;

export const ButtonDiv = styled.div`
  display: flex;
  gap: 5px;
`;

export const AcceptButton = styled.button<CheckButtonProps>`
  padding: 7px 10px;
  background: none;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.isAccepted ? 'black' : 'white')};
  color: ${(props) => (props.isAccepted ? 'white' : 'black')};
`;

export const RejectButton = styled.button<CheckButtonProps>`
  padding: 7px 10px;
  background: none;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.isAccepted ? 'white' : 'black')};
  color: ${(props) => (props.isAccepted ? 'black' : 'white')};
`;

export const ApplicantContent = styled.p`
  margin-top: 20px;
  margin-left: 40px;
`;
