import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkApply, getConfirmedApplicantList, getPartnerPost, updatePostStatus } from '../api/supabase/partner';
import Communication from '../components/partner/communicate/Communication';
import ConfirmedPartnerList from '../components/partner/communicate/ConfirmedPartnerList';
import PartnerCommentsList from '../components/partner/partnerComment/PartnerComments';
import PartnerDetailInfo from '../components/partner/partnerDetailInfo/PartnerDetailInfo';
import { useStateStore } from '../zustand/communicate';
import useSessionStore from '../zustand/store';
import * as St from './style';

function PartnerDetail() {
  const { postid } = useParams<string>();
  const { session } = useSessionStore();
  const logInUserId = session?.user.id;

  const { partnerStatus, applicantStatus, setPartnerStatus, setApplicantStatus } = useStateStore();

  const [isApply, setIsApply] = useState<boolean | null>(null);

  const { data: partnerPost, isLoading, isError } = useQuery(['partnerPost', postid], () => getPartnerPost({ postId: postid as string }));
  const partnerPostData = partnerPost?.data!;

  const { data: confirmedApplicants } = useQuery(['confirmedApplicants', postid], () => getConfirmedApplicantList(postid!));

  useEffect(() => {
    const fetchData = async () => {
      if (postid && logInUserId) {
        const applyHistory = await checkApply(postid, logInUserId);
        if (applyHistory && applyHistory.length > 0) {
          setIsApply(true);
          const AcceptedStatus = applyHistory[0].isAccepted;
          if (AcceptedStatus === null) {
            setApplicantStatus('참여 신청 중');
          }
          if (AcceptedStatus !== null) {
            setApplicantStatus(AcceptedStatus ? '참여 수락됨' : '참여 거절됨');
          }
        } else {
          setIsApply(false);
          setApplicantStatus(null);
        }
      }
    };
    fetchData();
  }, [postid, logInUserId, setApplicantStatus]);

  useEffect(() => {
    const currentDate = new Date();
    if (partnerPostData && confirmedApplicants) {
      const endDate = new Date(partnerPostData.endDate);
      if (endDate < currentDate || (confirmedApplicants.data && confirmedApplicants.data.length >= partnerPostData.numOfPeople)) {
        updatePostStatus(postid!, false);
        setPartnerStatus('모집완료');
      } else if (endDate >= currentDate || (confirmedApplicants.data ? confirmedApplicants.data.length : 0) < partnerPostData.numOfPeople) {
        updatePostStatus(postid!, true);
        setPartnerStatus('모집중');
      }
    }
  }, [partnerPostData, postid, confirmedApplicants, setPartnerStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <St.PartnerDetailMain>
        <PartnerDetailInfo partnerPostData={partnerPostData} />
        <St.CommunicateDiv>
          <ConfirmedPartnerList postId={postid} />
          {logInUserId ? <Communication postId={postid} writerId={partnerPostData.writerId} logInUserId={logInUserId} /> : <></>}
        </St.CommunicateDiv>
      </St.PartnerDetailMain>
      <St.Status>
        <St.PostStatus $partnerStatus={partnerStatus}>{partnerStatus === '모집중' ? '모집중' : '모집완료'}</St.PostStatus>
        {isApply && <St.ApplyStatus>{applicantStatus}</St.ApplyStatus>}
      </St.Status>
      <PartnerCommentsList />
    </>
  );
}

export default PartnerDetail;
