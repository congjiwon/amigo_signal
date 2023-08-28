import { useEffect, useState } from 'react';
import { getConfirmedApplicantList } from '../../../api/supabase/partner';
import ConfirmedPartnerItem from './ConfirmedPartnerItem';
import * as St from './style';
import { useConfirmedListStore } from '../../../zustand/communicate';

type ConfirmedPartnerListProps = {
  postId: string | undefined;
};
const ConfirmedPartnerList = ({ postId }: ConfirmedPartnerListProps) => {
  const { confirmedList, updatedConfirmedList } = useConfirmedListStore();

  useEffect(() => {
    const fetchConfirmedPartnerList = async () => {
      if (postId) {
        const response = await getConfirmedApplicantList(postId!);
        if (response.data !== null) {
          updatedConfirmedList(response.data);
        }
        console.log('response', response.data);
      }
    };
    fetchConfirmedPartnerList();
  }, [postId, updatedConfirmedList]);

  return (
    <St.ConfirmedApplicantList>
      <h1>이 사람들과 같이 여행가요:)</h1>
      <br />
      <div>
        {confirmedList.map((item) => {
          return <ConfirmedPartnerItem key={item.id} data={item} />;
        })}
      </div>
    </St.ConfirmedApplicantList>
  );
};

export default ConfirmedPartnerList;
