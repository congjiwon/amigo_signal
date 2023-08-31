import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { checkApply, deleteApplicant, getApplicantList, isPostOpen } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import { BtnStyleType } from '../../../types/styleTypes';
import { useModalStore } from '../../../zustand/store';
import Button from '../../common/button/Button';
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
  const [applicantList, setApplicantList] = useState<Tables<'applicants'>[]>([]);

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

  // 신청자 목록에 수락/거절하지 않은 신청자가 존재하는지 확인
  useEffect(() => {
    const fetchApplicant = async () => {
      if (!postId) return;
      const { data, error } = await getApplicantList(postId);
      if (error || !data) {
        console.error('신청자 목록을 가져오는 과정에서 error 발생', error);
        setApplicantList([]);
      } else {
        setApplicantList(data);
      }
    };
    fetchApplicant();
  }, [postId]);
  const hasApplicants = applicantList && applicantList.length > 0;

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
    <St.CommunicationDiv>
      {writerId !== logInUserId ? (
        <St.ApplyDiv>
          {isConfirmed || !isThisPostOpen ? (
            <></>
          ) : (
            <Button styleType={BtnStyleType.BTN_DARK} onClick={isApply ? handleApplyCancel : handleApply} fullWidth>
              {isApply ? '참여 취소' : '참여하기'}
            </Button>
          )}
        </St.ApplyDiv>
      ) : (
        <>
          {isThisPostOpen && (
            <Button styleType={BtnStyleType.BTN_DARK} onClick={() => openModal('applicantList')} fullWidth>
              동행 신청자 목록
            </Button>
          )}

          {hasApplicants ? <St.NewApplicantAlert>새로운 동행 신청이 있습니다.</St.NewApplicantAlert> : <></>}
        </>
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
    </St.CommunicationDiv>
  );
};

export default Communication;
