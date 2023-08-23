import * as St from './style';

const ApplicantList = () => {
  return (
    <>
      <St.ModalTitle>동행 신청자 리스트</St.ModalTitle>
      <St.ApplicantList>
        <St.ApplicantCard>아이디</St.ApplicantCard>
        <St.ApplicantCard>아이디</St.ApplicantCard>
        <St.ApplicantCard>아이디</St.ApplicantCard>
        <St.ApplicantCard>아이디</St.ApplicantCard>
        <St.ApplicantCard>아이디</St.ApplicantCard>
      </St.ApplicantList>
    </>
  );
};

export default ApplicantList;
