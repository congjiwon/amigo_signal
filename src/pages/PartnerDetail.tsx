import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkApply, getConfirmedApplicantList, getPartnerPost, updatePostStatus } from '../api/supabase/partner';
import LoadingSpinner from '../components/common/loadingSpinner/LoadingSpinner';
import Communication from '../components/partner/communicate/Communication';
import ConfirmedPartnerList from '../components/partner/communicate/ConfirmedPartnerList';
import PartnerComments from '../components/partner/partnerComment/PartnerComments';
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

  const { data: partnerPost, isLoading: isLoadingPost, isError } = useQuery(['partnerPost', postid], () => getPartnerPost({ postId: postid as string }));

  const { data: confirmedApplicants, isLoading: isLoadingApplicants } = useQuery(['confirmedApplicants', postid], () => getConfirmedApplicantList(postid!));

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

  // 자동 모집완료 로직 (모집인원, 여행 기간 endDate)
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (partnerPost && confirmedApplicants?.data) {
      const endDate = new Date(partnerPost.endDate);
      endDate.setHours(0, 0, 0, 0);
      if (endDate < currentDate || confirmedApplicants.data.length >= partnerPost.numOfPeople) {
        updatePostStatus(postid!, false);
        setPartnerStatus('모집완료');
      } else if (endDate >= currentDate || confirmedApplicants.data.length < partnerPost.numOfPeople) {
        updatePostStatus(postid!, true);
        setPartnerStatus('모집중');
      }
    }
  }, [partnerPost, postid, confirmedApplicants, setPartnerStatus]);

  if (isLoadingPost || isLoadingApplicants) {
    return <LoadingSpinner />;
  }

  if (isError) {
    <div>error data</div>;
  }

  return (
    <>
      <St.PartnerDetailMain>
        <St.PartnerDetailInfoSection>
          <PartnerDetailInfo partnerPostData={partnerPost!} />
        </St.PartnerDetailInfoSection>
        <St.CommunicateDiv>
          <ConfirmedPartnerList postId={postid} />
          {logInUserId ? <Communication postId={postid} writerId={partnerPost?.writerId!} logInUserId={logInUserId} isApply={isApply} setIsApply={setIsApply} /> : <></>}
        </St.CommunicateDiv>
      </St.PartnerDetailMain>
      <St.Status>
        <St.PostStatus $partnerStatus={partnerStatus}>{partnerStatus === '모집중' ? '모집중' : '모집완료'}</St.PostStatus>
        {isApply && applicantStatus !== null ? <St.ApplyStatus>{applicantStatus}</St.ApplyStatus> : <></>}
      </St.Status>
      <PartnerComments />
    </>
  );
}

export default PartnerDetail;
