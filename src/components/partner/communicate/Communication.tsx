import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { checkApply, deleteApplicant, isPostOpen } from '../../../api/supabase/partner';
import { useModalStore } from '../../../zustand/store';
import Modal from '../../common/modal/Modal';
import { Alert, ConfirmCancel } from '../../common/modal/alert';
import ApplicantList from './ApplicantList';
import ApplyWithInfo from './ApplyWithInfo';
import * as St from './style';

type CommunicationProps = {
  postId: string | undefined;
  writerId: string | null | undefined;
  logInUserId: string;
};

const Communication = ({ postId, writerId, logInUserId }: CommunicationProps) => {
  const { openedModals, openModal } = useModalStore();

  const [isApply, setIsApply] = useState<boolean | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (postId && logInUserId) {
        const applyHistory = await checkApply(postId, logInUserId);
        if (applyHistory && applyHistory.length > 0) {
          setIsApply(true);
          const confirmedStatus = applyHistory[0].isConfirmed;
          setIsConfirmed(confirmedStatus);
        } else {
          setIsApply(false);
          setIsConfirmed(false);
        }
      }
    };
    fetchData();
  }, [postId, logInUserId]);

  // 모집 완료 시 참여하기 버튼 보이지 않도록 조건 추가
  const { data: isPartnerPostsOpen } = useQuery<{ data: { isOpen: boolean } | null }>(['postOpenStatus', postId], () => isPostOpen(postId!));
  const isThisPostOpen = isPartnerPostsOpen?.data?.isOpen;

  const handleApplyCancel = async () => {
    if (!postId || !logInUserId) {
      console.error('postId 또는 applicantId 유효하지 않습니다.');
      return;
    }
    // 참여 취소 확인
    const isConfirmed = await ConfirmCancel('참여가 취소되었습니다.');
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteApplicant(postId, logInUserId);
      setIsApply(false);
    } catch (error) {
      console.error('참여 취소 과정에서 error 발생', error);
      Alert({ title: '참여 취소 중 문제가 발생했습니다.', position: 'top-end' });
    }
  };

  const handleApply = () => {
    openModal('applyWithInfo');
  };

  return (
    <div>
      {writerId !== logInUserId ? (
        <St.ApplyDiv>{isConfirmed || !isThisPostOpen ? <></> : <button onClick={isApply ? handleApplyCancel : handleApply}>{isApply ? '참여 취소' : '참여하기'}</button>}</St.ApplyDiv>
      ) : (
        <button onClick={() => openModal('applicantList')}>동행 신청자 목록</button>
      )}

      {openedModals.applyWithInfo && (
        <Modal id="applyWithInfo" size="medium">
          <ApplyWithInfo postId={postId} applicantId={logInUserId} setIsApply={setIsApply} />
        </Modal>
      )}

      {openedModals.applicantList && (
        <Modal id="applicantList" size="large">
          <ApplicantList postId={postId} />
        </Modal>
      )}
    </div>
  );
};

export default Communication;
