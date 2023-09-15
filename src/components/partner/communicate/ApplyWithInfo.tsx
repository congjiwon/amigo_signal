import React, { useState } from 'react';
import { insertApplicant } from '../../../api/supabase/partner';
import { BtnStyleType } from '../../../types/styleTypes';
import { useStateStore } from '../../../zustand/communicate';
import { useModalStore } from '../../../zustand/store';
import Button from '../../common/button/Button';
import { Input } from '../../common/input/Input';
import { Alert, ConfirmCustom } from '../../common/modal/alert';
import * as St from './style';

type ApplyWithInfoProps = {
  postId: string | undefined;
  writerId: string | undefined | null;
  applicantId: string | undefined;
  setIsApply: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const ApplyWithInfo = ({ postId, writerId, applicantId, setIsApply }: ApplyWithInfoProps) => {
  const { closeModal } = useModalStore();

  const [text, setText] = useState('');

  const { setApplicantStatus } = useStateStore();

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= 300) setText(newText);
  };

  const handleSubmit = async () => {
    if (!postId || !applicantId || !writerId) {
      return;
    }

    const applicantData = {
      postId,
      applicantId,
      content: text,
      isConfirmed: false,
      writerId,
    };

    if (text.trim() === '') {
      const isConfirmed = await ConfirmCustom({
        title: '자기소개 없이 참여 신청하시겠습니까?',
        text: '동행 글 작성자에게 한 마디 코멘트를 남겨주세요!',
        confirmButtonText: '신청',
        cancelButtonText: '취소',
        confirmMessage: '참여신청됨',
        message: '동행 참여 신청이 완료되었습니다!',
      });
      if (!isConfirmed) return;
      try {
        setApplicantStatus('참여 신청중');
        await insertApplicant(applicantData);
        setIsApply(true);
        closeModal('applyWithInfo');
      } catch (error) {}
    } else {
      try {
        setApplicantStatus('참여 신청중');
        await insertApplicant(applicantData);
        setIsApply(true);
        closeModal('applyWithInfo');
        Alert({ title: '동행 참여 신청이 완료되었습니다!' });
      } catch (error) {}
    }
  };

  const buttonStyleType = text.trim() === '' ? BtnStyleType.BTN_NOTEXTAPPLY : BtnStyleType.BTN_APPLY;

  return (
    <>
      <St.ModalTitle>동행 참여 신청하기</St.ModalTitle>
      <St.InputBox>
        <Input type="textarea" $inputStyleType="apply" $border={true} placeholder="간단한 자기소개를 작성해주세요." value={text} onChange={handleText} />
        <St.TextCount>{text.length}/300 자</St.TextCount>
      </St.InputBox>
      <St.SubmitApply>
        <Button type="submit" styleType={buttonStyleType} onClick={handleSubmit}>
          신청
        </Button>
      </St.SubmitApply>
    </>
  );
};

export default ApplyWithInfo;
