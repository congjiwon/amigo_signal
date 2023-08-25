import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { checkApply, getPartnerPost } from '../api/supabase/partner';
import PartnerCommentsList from '../components/partner/partnerComment/PartnerComments';
import PartnerDetailInfo from '../components/partner/partnerDetailInfo/PartnerDetailInfo';
import Communication from '../components/partner/communicate/Communication';
import useSessionStore from '../zustand/store';
import ConfirmedPartnerList from '../components/partner/communicate/ConfirmedPartnerList';
import * as St from './style';
import { useEffect, useState } from 'react';

function PartnerDetail() {
  const { postid } = useParams<string>();
  const { session } = useSessionStore();
  const logInUserId = session?.user.id;

  const [isApply, setIsApply] = useState<boolean | null>(null);
  const [isAccepted, setIsAccepted] = useState<boolean | null>();

  useEffect(() => {
    const fetchData = async () => {
      if (postid && logInUserId) {
        const applyHistory = await checkApply(postid, logInUserId);
        if (applyHistory && applyHistory.length > 0) {
          setIsApply(true);
          const AcceptedStatus = applyHistory[0].isAccepted;
          setIsAccepted(AcceptedStatus);
        } else {
          setIsApply(false);
          setIsAccepted(null);
        }
      }
    };
    fetchData();
  }, [postid, logInUserId]);

  const { data: partnerPost, isLoading, isError } = useQuery(['partnerPost', postid], () => getPartnerPost({ postId: postid as string }));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const partnerPostData = partnerPost.data!;

  return (
    <>
      <St.PartnerDetailMain>
        <PartnerDetailInfo partnerPostData={partnerPostData} />
        <St.CommunicateDiv>
          <ConfirmedPartnerList postId={postid} />
          <br />
          {logInUserId ? <Communication postId={postid} writerId={partnerPostData.writerId} logInUserId={logInUserId} /> : <></>}
        </St.CommunicateDiv>
      </St.PartnerDetailMain>
      <St.Status>
        <St.PostStatus isOpen={partnerPostData.isOpen}>{partnerPostData.isOpen ? '모집중' : '모집완료'}</St.PostStatus>
        {isApply && <St.ApplyStatus>{isAccepted === null ? '참여 신청 중' : isAccepted ? '참여 수락됨' : '참여 거절됨'}</St.ApplyStatus>}
      </St.Status>
      <PartnerCommentsList />
    </>
  );
}

export default PartnerDetail;
