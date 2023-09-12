import { styled } from 'styled-components';

type ApplicantCardProps = {
  $isClicked: boolean;
};

type CheckButtonProps = {
  $isAccepted: boolean | null;
};

type ConfirmedApplicantListProps = {
  $isExist: boolean;
};

export const ApplyDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CommunicationDiv = styled.div`
  width: 282px;
`;

export const NewApplicantAlert = styled.p`
  margin: 10px auto;
  font-size: 12px;
  color: red;
`;

export const ModalTitle = styled.h1`
  margin-top: 48px;
  margin-left: 40px;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const TextCount = styled.span`
  position: absolute;
  top: 281px;
  right: 60px;
  font-size: 14px;
  color: #3f4656;
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
  width: 91.96%;
  margin: 0px auto;
  margin-top: 30px;
  overflow-y: auto;
`;

export const ApplicantCard = styled.div<ApplicantCardProps>`
  margin-top: 15px;
  padding: 20px;
  border: ${(props) => (props.$isClicked ? '1.5px solid black' : '1px solid lightgray')};
  border-radius: 10px;
`;

export const ApplicantProfile = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ApplicantInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`;

export const ApplicantProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const ApplicantNickName = styled.p`
  font-weight: bold;
  font-size: 1rem;
`;

export const ApplicantAgeGender = styled.p`
  color: gray;
`;

export const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  flex: 0 0 auto;
`;

export const AcceptButton = styled.button<CheckButtonProps>`
  width: 65px;
  height: 32px;
  padding: 7px 10px;
  background: none;
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.$isAccepted === null) return 'white';
    return props.$isAccepted ? '#643BDC' : 'white';
  }};
  border-color: ${(props) => {
    if (props.$isAccepted === null) return 'black';
    return props.$isAccepted ? '#643BDC' : 'black';
  }};
  color: ${(props) => {
    if (props.$isAccepted === null) return 'black';
    return props.$isAccepted ? 'white' : 'black';
  }};

  @media (max-width: 550px) {
    height: 30px;
    border-radius: 15px;
  }
`;

export const RejectButton = styled.button<CheckButtonProps>`
  width: 65px;
  height: 32px;
  padding: 7px 10px;
  background: none;
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.$isAccepted === null) return 'white';
    return props.$isAccepted ? 'white' : 'black';
  }};
  color: ${(props) => {
    if (props.$isAccepted === null) return 'black';
    return props.$isAccepted ? 'black' : 'white';
  }};
  @media (max-width: 550px) {
    height: 30px;
    border-radius: 15px;
  }
`;

export const ApplicantContent = styled.p`
  margin-top: 20px;
  margin-left: 56px;
  overflow-wrap: anywhere;
  font-size: 14px;
  line-height: 150%;
`;

export const ConfirmedApplicantList = styled.div<ConfirmedApplicantListProps>`
  width: 282px;
  margin-bottom: 20px;
  padding-bottom: ${(props) => (props.$isExist ? '40px' : '0px')};
  border: 1px solid lightgray;
  border-radius: 10px;
  h1 {
    margin-top: 40px;
    margin-left: 24px;
    font-weight: 600;
  }
`;

export const AlertEmpty = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 13px;
  color: gray;
`;

export const ConfirmedApplicantItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
`;

export const ConfirmedApplicantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

export const ConfirmedApplicantAgeNGender = styled.p`
  color: #3f4656;
  font-size: 12px;
`;
