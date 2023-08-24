import React, { useState } from 'react';
import { Input } from '../../common/input/Input';
import * as St from './style';
import Button from '../../common/button/Button';
import { BtnStyleType } from '../../../types/styleTypes';
import { useModalStore } from '../../../zustand/store';
import { insertApplicant } from '../../../api/supabase/partner';

type ApplyWithInfoProps = {
  postId: string | undefined;
  applicantId: string | undefined;
  setIsApply: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const ApplyWithInfo = ({ postId, applicantId, setIsApply }: ApplyWithInfoProps) => {
  const { closeModal } = useModalStore();

  const [text, setText] = useState('');

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!postId || !applicantId) {
      console.error('postId 또는 applicantId 유효하지 않습니다.');
      return;
    }
    const applicantData = {
      postId,
      applicantId,
      isInvolved: 'pending',
      content: text,
    };
    try {
      await insertApplicant(applicantData);
      setIsApply(true);
      closeModal('applyWithInfo');
    } catch (error) {
      console.log('참가 신청 모달 제출 과정에서 오류 발생', error);
    }
  };

  return (
    <>
      <St.ModalTitle>동행 참여 신청하기</St.ModalTitle>
      <Input type="textarea" inputStyleType="apply" border={true} placeholder="간단한 자기소개를 작성해주세요." value={text} onChange={handleText} />

      <St.TextCount>{text.length}/300 자</St.TextCount>
      <St.SubmitApply>
        <Button type="submit" styleType={BtnStyleType.BTN_DARK} onClick={handleSubmit}>
          신청
        </Button>
      </St.SubmitApply>
    </>
  );
};

export default ApplyWithInfo;
