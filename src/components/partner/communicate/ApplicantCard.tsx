import { useState } from 'react';
import { makeRestApplicantStatusReject, updatePostStatus, updateStatus } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import { useConfirmedListStore, useStateStore } from '../../../zustand/communicate';
import { useModalStore } from '../../../zustand/store';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import { ConfirmCustom } from '../../common/modal/alert';
import * as St from './style';

type ApplicantCardProps = {
  data: Tables<'applicants'>;
  postId: string;
  onClick: (id: string) => void;
  isSelected: boolean;
  removeConfirmedApplicant: (id: string) => void;
  confirmedLength: number;
  numOfPeople: number;
};

const ApplicantCard = ({ data, postId, onClick, isSelected, removeConfirmedApplicant, confirmedLength, numOfPeople }: ApplicantCardProps) => {
  const { closeModal } = useModalStore();

  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  const applicantId = data.applicantId;

  const { setApplicantStatus, setPartnerStatus } = useStateStore();
  const { addConfirmedApplicant } = useConfirmedListStore();

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
      await updateStatus(applicantId, postId, true);
      setApplicantStatus('참여 수락됨');
      const updatedConfirmedLength = confirmedLength + 1;
      if (numOfPeople <= updatedConfirmedLength) {
        setPartnerStatus('모집완료');
        updatePostStatus(postId, false);
        makeRestApplicantStatusReject(postId);
      }
      addConfirmedApplicant(data);
      removeConfirmedApplicant(applicantId);
      closeModal('applicantList');
    } catch (error) {}
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
      await updateStatus(applicantId, postId, false);
      setApplicantStatus('참여 거절됨');
      removeConfirmedApplicant(applicantId);
      closeModal('applicantList');
    } catch (error) {}
  };

  return (
    <St.ApplicantCard onClick={() => onClick(data.id)} $isClicked={isSelected}>
      <St.ApplicantProfile>
        <St.ApplicantInfo>
          {data.users?.profileImageUrl ? <St.ApplicantProfileImage src={`${storagaUrl}/${data.users?.profileImageUrl}`} alt="profile" /> : <St.ApplicantProfileImage src={defaultProfileImage} alt="profile" />}
          <St.ApplicantNickName>{data.users?.nickName}</St.ApplicantNickName>
          <St.ApplicantAgeGender>
            {classifyingAge(data.users?.birthday!)} | {data.users?.gender}
          </St.ApplicantAgeGender>
        </St.ApplicantInfo>
      </St.ApplicantProfile>

      <St.ButtonDiv>
        <St.AcceptButton onClick={handleAccept} $isAccepted={isAccepted}>
          수락
        </St.AcceptButton>
        <St.RejectButton onClick={handleReject} $isAccepted={isAccepted}>
          거절
        </St.RejectButton>
      </St.ButtonDiv>

      <St.ApplicantContent>{data.content}</St.ApplicantContent>
    </St.ApplicantCard>
  );
};

export default ApplicantCard;
