import { useEffect, useState } from 'react';
import { getConfirmedApplicantList } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import ConfirmedPartnerItem from './ConfirmedPartnerItem';
import * as St from './style';

type ConfirmedPartnerListProps = {
  postId: string | undefined;
};
const ConfirmedPartnerList = ({ postId }: ConfirmedPartnerListProps) => {
  const [confirmedApplicantList, setConfirmedApplicantList] = useState<Tables<'applicants'>[]>([]);
  useEffect(() => {
    const fetchConfirmedPartnerList = async () => {
      if (postId) {
        const response = await getConfirmedApplicantList(postId!);
        if (response.data !== null) {
          setConfirmedApplicantList(response.data);
        }
        console.log('response', response.data);
      }
    };
    fetchConfirmedPartnerList();
  }, [postId]);

  return (
    <St.ConfirmedApplicantList>
      <h1>이 사람들과 같이 여행가요:)</h1>
      <br />
      <div>
        {confirmedApplicantList.map((item) => {
          return <ConfirmedPartnerItem key={item.id} data={item} />;
        })}
      </div>
    </St.ConfirmedApplicantList>
  );
};

export default ConfirmedPartnerList;
