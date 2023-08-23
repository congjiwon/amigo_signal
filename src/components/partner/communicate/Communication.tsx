import { useEffect, useState } from 'react';
import * as St from './style';
import useSessionStore, { useModalStore } from '../../../zustand/store';
import Modal from '../../common/modal/Modal';
import ApplicantList from './ApplicantList';
import ApplyWithInfo from './ApplyWithInfo';
import { checkApply, deleteApplicant } from '../../../api/supabase/partner';
import { Alert, ConfirmCancel } from '../../common/modal/alert';

type CommunicationProps = {
  postId: string | undefined;
  writerId: string | null | undefined;
};

const Communication = ({ postId, writerId }: CommunicationProps) => {
  const { openedModals, openModal } = useModalStore();

  const [isApply, setIsApply] = useState<boolean | null>(null);

  const { session } = useSessionStore();
  const logInUserId = session?.user.id;

  useEffect(() => {
    const fetchData = async () => {
      if (postId && logInUserId) {
        const applyHistory = await checkApply(postId, logInUserId);
        if (applyHistory && applyHistory.length > 0) {
          setIsApply(true);
        } else setIsApply(false);
      }
    };
    fetchData();
  }, [postId, logInUserId]);

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
        <St.ApplyDiv>
          <button onClick={isApply ? handleApplyCancel : handleApply}>{isApply ? '참여 취소' : '참여하기'}</button>
          <St.ApplyStatus>상태 확인 태그</St.ApplyStatus>
        </St.ApplyDiv>
      ) : (
        <button onClick={() => openModal('applicantList')}>신청자 목록</button>
      )}
      {openedModals.applyWithInfo && (
        <Modal id="applyWithInfo" size="medium">
          <ApplyWithInfo postId={postId} applicantId={logInUserId} setIsApply={setIsApply} />
        </Modal>
      )}
      {openedModals.applicantList && (
        <Modal id="applicantList" size="large">
          <ApplicantList />
        </Modal>
      )}
    </div>
  );
};

export default Communication;