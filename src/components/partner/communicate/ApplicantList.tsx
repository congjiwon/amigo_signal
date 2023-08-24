import { useEffect, useState } from 'react';
import { getApplicantList } from '../../../api/supabase/partner';
import * as St from './style';
import { Tables } from '../../../api/supabase/supabase';
import ApplicantCard from './ApplicantCard';

type ApplicantListProps = {
  postId: string | undefined;
};

const ApplicantList = ({ postId }: ApplicantListProps) => {
  const [applicantList, setApplicantList] = useState<Tables<'applicants'>[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setSelectedCardId(id);
  };

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!postId) return;
      const { data, error } = await getApplicantList(postId);
      if (error || !data) {
        console.error('신청자 목록을 가져오는 과정에서 error 발생', error);
        setApplicantList([]);
      } else {
        setApplicantList(data);
        console.log('신청자 목록', data);
      }
    };
    fetchApplicant();
  }, [postId]);

  return (
    <>
      <St.ModalTitle>동행 신청 대기 리스트</St.ModalTitle>
      <St.ApplicantList>
        {applicantList.map((data) => {
          return <ApplicantCard key={data.id} data={data} onClick={handleCardClick} isSelected={selectedCardId === data.id} />;
        })}
      </St.ApplicantList>
    </>
  );
};

export default ApplicantList;
