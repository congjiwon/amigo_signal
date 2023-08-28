import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getApplicantStatus, getConfirmedApplicantList, getNumOfPeople, updateStatus } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import { useConfirmedListStore, useStateStore } from '../../../zustand/communicate';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import { ConfirmCustom } from '../../common/modal/alert';
import * as St from './style';

type ApplicantCardProps = {
  data: Tables<'applicants'>;
  onClick: (id: string) => void;
  isSelected: boolean;
  removeConfirmedApplicant: (id: string) => void;
};

const ApplicantCard = ({ data, onClick, isSelected, removeConfirmedApplicant }: ApplicantCardProps) => {
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  const applicantId = data.applicantId;

  const { setApplicantStatus } = useStateStore();
  const { addConfirmedApplicant } = useConfirmedListStore();

  const { data: confirmedApplicants } = useQuery(['confirmedApplicants', data.postId], () => getConfirmedApplicantList(data.postId!.id));
  const { data: getNumberOfPeople } = useQuery(['numOfPeople', data.postId], () => getNumOfPeople(data.postId.id));

  const confirmedLength = confirmedApplicants?.data?.length || 0;
  const numOfPeople = getNumberOfPeople?.[0]?.numOfPeople || 0;

  // useEffect(() => {
  //   const fetchApplicantStatus = async () => {
  //     const response = await getApplicantStatus(applicantId);
  //     if (response.isAccepted === null) {
  //       setApplicantStatus('참여 신청 중');
  //     } else if (response.isAccepted !== null) {
  //       setApplicantStatus(response.isAccepted ? '참여 수락됨' : '참여 거절됨');
  //     }
  //   };
  //   fetchApplicantStatus();
  // }, [applicantId, setApplicantStatus]);

  const handleAccept = async () => {
    setIsAccepted(true);
    const isConfirmed = await ConfirmCustom({
      title: '정말 수락하시겠습니까?',
      text: '수락 시 신청 대기 목록에서 삭제되며, 추후 거절 불가합니다.',
      confirmButtonText: '수락',
      cancelButtonText: '취소',
      confirmMessage: '수락됨',
      message: `${data.users?.nickName}님의 참여가 수락되었습니다.`,
    });
    if (!isConfirmed) {
      return;
    }
    try {
      await updateStatus(applicantId, true);
      setApplicantStatus('참여 수락됨');
      addConfirmedApplicant(data);
      removeConfirmedApplicant(applicantId);
    } catch (error) {
      console.error('수락 과정 중 error 발생', error);
    }
  };

  const handleReject = async () => {
    setIsAccepted(false);
    const isConfirmed = await ConfirmCustom({
      title: '정말 거절하시겠습니까?',
      text: '거절 시 신청 대기 목록에서 삭제됩니다.',
      confirmButtonText: '거절',
      cancelButtonText: '취소',
      confirmMessage: '거절됨',
      message: `${data.users?.nickName}님의 참여가 거절되었습니다.`,
    });
    if (!isConfirmed) {
      return;
    }
    try {
      await updateStatus(applicantId, false);
      setApplicantStatus('참여 거절됨');
      removeConfirmedApplicant(applicantId);
    } catch (error) {
      console.error('거절 과정 중 error 발생', error);
    }
  };

  return (
    <St.ApplicantCard onClick={() => onClick(data.id)} isClicked={isSelected}>
      <St.ApplicantProfile>
        <St.ApplicantInfo>
          {data.users?.profileImageUrl ? <St.ApplicantProfileImage src={`${storagaUrl}/${data.users?.profileImageUrl}`} alt="profile" /> : <St.ApplicantProfileImage src={defaultProfileImage} alt="profile" />}
          <St.ApplicantNickName>{data.users?.nickName}</St.ApplicantNickName>
          <St.ApplicantAgeGender>
            {classifyingAge(data.users?.birthday!)} | {data.users?.gender}
          </St.ApplicantAgeGender>
        </St.ApplicantInfo>
        <St.ButtonDiv>
          <St.AcceptButton onClick={handleAccept} isAccepted={isAccepted}>
            수락
          </St.AcceptButton>
          <St.RejectButton onClick={handleReject} isAccepted={isAccepted}>
            거절
          </St.RejectButton>
        </St.ButtonDiv>
      </St.ApplicantProfile>
      <St.ApplicantContent>{data.content}</St.ApplicantContent>
    </St.ApplicantCard>
  );
};

export default ApplicantCard;
