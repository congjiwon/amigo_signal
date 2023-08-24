import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getCurrentUser } from '../../../api/supabase/users';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import useSessionStore from '../../../zustand/store';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import * as St from './style';
import Button from '../../common/button/Button';
import { BtnStyleType } from '../../../types/styleTypes';

export default function ModifyProfile() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const { isLoading, data: currentUser } = useQuery(['partnerCurrentUser'], () => getCurrentUser(userId as string));
  const ageRange = currentUser && classifyingAge(currentUser.birthday);

  const [nickName, setNickName] = useState<string | undefined>(currentUser?.nickName);
  const [profileImgUrl, setProfileImgUrl] = useState<string | undefined | null>(currentUser?.profileImageUrl);

  return (
    <St.ModifyProfileWrapper>
      <h2>프로필 수정</h2>
      <form>
        <St.ModifyProfileBox>
          <div>
            <div>
              <label htmlFor="">닉네임: </label>
              <input type="text" value={nickName} />
            </div>
          </div>
          <St.ProfileImgBox>
            <img src={profileImgUrl ? profileImgUrl : defaultImg} />
            <input type="file" name="" id="" />
          </St.ProfileImgBox>
        </St.ModifyProfileBox>
        <St.BtnBox>
          <Button styleType={BtnStyleType.BTN_DARK}>취소</Button>
          <Button styleType={BtnStyleType.BTN_SUBMIT}>수정</Button>
        </St.BtnBox>
      </form>
    </St.ModifyProfileWrapper>
  );
}
