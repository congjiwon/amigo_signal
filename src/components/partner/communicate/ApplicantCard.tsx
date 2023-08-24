import { Tables } from '../../../api/supabase/supabase';
import * as St from './style';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import { getApplicantStatus, updateStatus } from '../../../api/supabase/partner';
import { useEffect, useState } from 'react';
import { ConfirmCustom } from '../../common/modal/alert';

type ApplicantCardProps = {
  data: Tables<'applicants'>;
  onClick: (id: string) => void;
  isSelected: boolean;
};

const ApplicantCard = ({ data, onClick, isSelected }: ApplicantCardProps) => {
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);

  const applicantId = data.applicantId;

  useEffect(() => {
    const fetchApplicantStatus = async () => {
      const response = await getApplicantStatus(applicantId);
      setIsAccepted(response.status === 'accepted');
    };
    fetchApplicantStatus();
  }, [isAccepted, applicantId]);

  const handleAccept = async () => {
    const isConfirmed = await ConfirmCustom({
      title: '정말 수락하시겠습니까?',
      text: '수락 시 신청 대기 목록에서 삭제됩니다.',
      confirmButtonText: '수락',
      cancelButtonText: '취소',
      confirmMessage: '수락됨',
      message: `${data.users?.nickName}님의 참여가 수락되었습니다.`,
    });
    if (!isConfirmed) {
      return;
    }
    try {
      await updateStatus(applicantId, 'accepted');
      setIsAccepted(true);
    } catch (error) {
      console.error('수락 과정 중 error 발생', error);
    }
  };

  const handleReject = async () => {
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
      await updateStatus(applicantId, 'rejected');
      setIsAccepted(false);
    } catch (error) {
      console.error('거절 과정 중 error 발생', error);
    }
  };

  return (
    <St.ApplicantCard onClick={() => onClick(data.id)} isClicked={isSelected}>
      <St.ApplicantProfile>
        <St.ApplicantInfo>
          {data.users?.profileImageUrl ? <St.ApplicantProfileImage src={data.users?.profileImageUrl} alt="profile" /> : <St.ApplicantProfileImage src={defaultProfileImage} alt="profile" />}
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
