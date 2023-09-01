import { useEffect, useState } from 'react';
import { checkApply, deleteApplicant, getApplicantList, isPostOpen } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import { BtnStyleType } from '../../../types/styleTypes';
import { useStateStore } from '../../../zustand/communicate';
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
  const { setApplicantStatus } = useStateStore();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [applicantList, setApplicantList] = useState<Tables<'applicants'>[]>([]);
  const [hasApplicants, setHasApplicants] = useState<boolean>();
  const [isThisPostOpen, setIsThisPostOpen] = useState<boolean>();

  // 지원자의 참여 신청 여부 확인 및 작성자의 confirmed 여부 세팅
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

  // 해당 post의 신청 대기 목록에 수락/거절하지 않은 신청자 리스트 뽑아오기 & 새롭게 신청한 지원자 있는 지 여부 설정
  useEffect(() => {
    const fetchApplicant = async () => {
      const { data, error } = await getApplicantList(postId!);
      if (error || !data) {
        setApplicantList([]);
      } else {
        setApplicantList(data);
      }
    };
    fetchApplicant();
    setHasApplicants(applicantList && applicantList.length > 0);
  }, [postId, applicantList]);

  // 해당 포스트가 모집 중인지 여부 설정 -> 모집 완료 시 참여하기/참여취소 버튼 및 동행 신청자 목록 보이지 않도록
  useEffect(() => {
    const getIsPostOpen = async () => {
      const { data: isPartnerPostsOpen } = await isPostOpen(postId!);
      setIsThisPostOpen(isPartnerPostsOpen?.isOpen);
    };
    getIsPostOpen();
  }, [postId]);

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
