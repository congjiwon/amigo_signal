import { useEffect } from 'react';
import { getConfirmedApplicantList } from '../../../api/supabase/partner';
import { useConfirmedListStore } from '../../../zustand/communicate';
import ConfirmedPartnerItem from './ConfirmedPartnerItem';
import * as St from './style';

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
    <St.ConfirmedApplicantList $isExist={confirmedList.length !== 0}>
      <h1>이 사람들과 같이 여행가요:)</h1>
      {confirmedList.length === 0 && (
        <St.AlertEmpty>
          아직 함께하는 동행이 없습니다.
          <br />
          <br />
          함께해주세요!
        </St.AlertEmpty>
      )}
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
