import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getConfirmedApplicantList, getNumOfPeople } from '../../../api/supabase/partner';
// import { Tables } from '../../../api/supabase/supabase';
import { Tables } from '../../../api/supabase/supabase';
import { useApplicantStore } from '../../../zustand/communicate';
import ApplicantCard from './ApplicantCard';
import * as St from './style';

type ApplicantListProps = {
  postId: string | undefined;
  applicantList: Tables<'applicants'>[];
  setApplicantList: React.Dispatch<React.SetStateAction<Tables<'applicants'>[]>>;
};

const ApplicantList = ({ postId, applicantList, setApplicantList }: ApplicantListProps) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const { setHasApplicant } = useApplicantStore();

  const { data: confirmedApplicants } = useQuery(['confirmedApplicants', postId], () => getConfirmedApplicantList(postId!));
  const { data: getNumberOfPeople } = useQuery(['numOfPeople', postId], () => getNumOfPeople(postId!));

  const confirmedLength = confirmedApplicants?.data?.length || 0;
  const numOfPeople = getNumberOfPeople?.[0]?.numOfPeople || 0;

  const handleCardClick = (id: string) => {
    setSelectedCardId(id);
  };

  const removeConfirmedApplicant = (applicantId: string) => {
    const updatedApplicantList = applicantList.filter((applicant) => applicant.applicantId !== applicantId);
    setApplicantList(updatedApplicantList);
    if (updatedApplicantList.length === 0) {
      setHasApplicant(false);
    }
  };

  return (
    <>
      <St.ModalTitle>동행 신청자 리스트</St.ModalTitle>
      {applicantList.length === 0 && <St.EmptyApplicant>동행 신청자가 없습니다.</St.EmptyApplicant>}
      <St.ApplicantList>
        {applicantList.map((data) => {
          return (
            <ApplicantCard key={data.id} data={data} postId={postId!} onClick={handleCardClick} isSelected={selectedCardId === data.id} removeConfirmedApplicant={removeConfirmedApplicant} confirmedLength={confirmedLength} numOfPeople={numOfPeople} />
          );
        })}
      </St.ApplicantList>
    </>
  );
};

export default ApplicantList;
