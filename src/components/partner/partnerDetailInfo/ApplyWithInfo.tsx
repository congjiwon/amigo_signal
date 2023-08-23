import React, { useState } from 'react';
import { Input } from '../../common/input/Input';
import * as St from './style';
import Button from '../../common/button/Button';
import { BtnStyleType } from '../../../types/styleTypes';

const ApplyWithInfo = () => {
  const [text, setText] = useState('');

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <St.ModalTitle>동행 참여 신청하기</St.ModalTitle>
      <Input type="textarea" inputStyleType="apply" border={true} placeholder="간단한 자기소개를 작성해주세요." value={text} onChange={handleText} />

      <St.TextCount>{text.length}/300 characters</St.TextCount>
      <St.SubmitApply>
        <Button type="submit" styleType={BtnStyleType.BTN_DARK}>
          신청
        </Button>
      </St.SubmitApply>
    </>
  );
};

export default ApplyWithInfo;
