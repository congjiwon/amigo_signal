import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { checkApply, deleteApplicant, getApplicantList, isPostOpen } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import { BtnStyleType } from '../../../types/styleTypes';
import { useApplicantStore, useStateStore } from '../../../zustand/communicate';
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
  isApply: boolean | null;
  setIsApply: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const Communication = ({ postId, writerId, logInUserId, isApply, setIsApply }: CommunicationProps) => {
  const { openedModals, openModal } = useModalStore();
  const { partnerStatus, setPartnerStatus, setApplicantStatus } = useStateStore();
  const { hasApplicant, setHasApplicant } = useApplicantStore();

  const [applicantList, setApplicantList] = useState<Tables<'applicants'>[]>([]);

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // 지원자의 참여 신청 여부 확인 및 작성자의 confirmed 여부 세팅
  useQuery(['checkApply', postId, logInUserId], () => checkApply(postId!, logInUserId), {
    enabled: !!postId && !!logInUserId,
    onSuccess: (applyHistory) => {
      if (applyHistory && applyHistory.length > 0) {
        setIsApply(true);
        const confirmedStatus = applyHistory[0].isConfirmed;
        setIsConfirmed(confirmedStatus);
      } else {
        setIsApply(false);
        setIsConfirmed(false);
      }
    },
  });

  // 해당 post의 신청 대기 목록에 수락/거절하지 않은 신청자 리스트 뽑아오기 & 새롭게 신청한 지원자 있는 지 여부 설정
  useQuery(['applicantList', postId], () => getApplicantList(postId!), {
    enabled: !!postId,
    onSuccess: (data) => {
      const derivedApplicantList = data?.data || [];
      setApplicantList(derivedApplicantList);
      setHasApplicant(derivedApplicantList.length > 0);
    },
    onError: () => {
      setApplicantList([]);
      setHasApplicant(false);
    },
  });

  // 해당 포스트가 모집 중인지 여부 설정 -> 모집 완료 시 참여하기/참여취소 버튼 및 동행 신청자 목록 보이지 않도록
  useQuery(['isPostOpen', postId], () => isPostOpen(postId!), {
    enabled: !!postId,
    onSuccess: (data) => {
      setPartnerStatus(data.data?.isOpen ? '모집중' : '모집완료');
    },
  });

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
      setApplicantStatus(null);
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
          {isConfirmed || partnerStatus === '모집완료' ? (
            <></>
          ) : (
            <Button styleType={BtnStyleType.BTN_COMMUNICATE} onClick={isApply ? handleApplyCancel : handleApply} fullWidth>
              {isApply ? '참여 취소' : '참여하기'}
            </Button>
          )}
        </St.ApplyDiv>
      ) : (
        <>
          {partnerStatus === '모집중' && (
            <Button styleType={BtnStyleType.BTN_COMMUNICATE} onClick={() => openModal('applicantList')} fullWidth>
              동행 신청자 목록
            </Button>
          )}

          {hasApplicant && partnerStatus === '모집중' ? <St.NewApplicantAlert>새로운 동행 신청이 있습니다.</St.NewApplicantAlert> : <></>}
        </>
      )}

      {openedModals.applyWithInfo && (
        <Modal id="applyWithInfo" size="medium">
          <ApplyWithInfo postId={postId} writerId={writerId} applicantId={logInUserId} setIsApply={setIsApply} />
        </Modal>
      )}

      {openedModals.applicantList && (
        <Modal id="applicantList" size="large">
          <ApplicantList postId={postId} applicantList={applicantList} setApplicantList={setApplicantList} />
        </Modal>
      )}
    </St.CommunicationDiv>
  );
};

export default Communication;
