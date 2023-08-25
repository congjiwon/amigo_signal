import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { supabase } from '../../../api/supabase/supabaseClient';
import { duplicationCheckFromUserTable, getCurrentUser, updateUserNickname, updateUserProfileImgUrl } from '../../../api/supabase/users';
import useSessionStore, { useModalStore } from '../../../zustand/store';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../common/button/Button';
import { BtnStyleType } from '../../../types/styleTypes';
import { Alert } from '../../common/modal/alert';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import * as St from './style';

export default function ModifyProfile() {
  const queryClient = useQueryClient();
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const { isLoading, data: currentUser } = useQuery(['currentUser', userId], () => getCurrentUser(userId as string));

  const [nickName, setNickName] = useState<string | undefined>(currentUser?.nickName);
  const [nickNameValidationMsg, setNickNameValidationMsg] = useState<string | null>('');
  const [nickNameStatus, setNickNameStatus] = useState<boolean>(true);
  const [profileImgUrl, setProfileImgUrl] = useState<string | undefined>(currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg);
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);

  const { closeModal } = useModalStore();

  const mutationNickName = useMutation(updateUserNickname, {
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser', userId]);
    },
  });

  const mutationImgUrl = useMutation(updateUserProfileImgUrl, {
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser', userId]);
    },
  });

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/.test(e.target.value);

    if (regex) {
      if (await duplicationCheckFromUserTable('nickName', e.target.value)) {
        setNickNameValidationMsg('이미 사용중인 닉네임입니다.');
        setNickNameStatus(false);
      } else {
        setNickNameValidationMsg('사용가능한 닉네임입니다.');
        setNickNameStatus(true);
      }
    } else {
      setNickNameValidationMsg('특수문자 제외, 2~10자리');
      setNickNameStatus(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setProfileImgUrl(URL.createObjectURL(selectedFile));
      setProfileImgFile(selectedFile);
    }
  };

  const handleSubmitUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationNickName.mutate({ nickName, userId });

    let profileUrl = null;
    if (profileImgFile) {
      const { error: storageError, data: storageData } = await supabase.storage.from('profileImgs').upload(`profile_imgs/${currentUser?.email}/${uuidv4()}`, profileImgFile, {
        cacheControl: '3600',
        upsert: true,
      });

      profileUrl = storageData?.path;
      mutationImgUrl.mutate({ profileImageUrl: profileUrl, userId });

      if (storageError) return Alert({ title: storageError.message });
    }

    Alert({ title: '수정이 완료되었습니다.' });
    closeModal('modifyProfile');
  };

  return (
    <St.ModifyProfileWrapper>
      <h2>프로필 수정</h2>
      <form onSubmit={(e) => handleSubmitUpdateProfile(e)}>
        <St.ModifyProfileBox>
          <div>
            <div>
              <label htmlFor="">닉네임: </label>
              <input type="text" value={nickName} onChange={handleOnChange} />
            </div>
            <St.MofifyNickNameMsg $validationStatus={nickNameStatus}>{nickNameValidationMsg}</St.MofifyNickNameMsg>
          </div>
          <div>
            <St.ProfileImgBox>
              <img src={profileImgUrl} />
            </St.ProfileImgBox>
            <input type="file" name="" id="" onChange={handleFileChange} />
          </div>
        </St.ModifyProfileBox>
        <St.BtnBox>
          <Button styleType={BtnStyleType.BTN_DARK}>취소</Button>
          <Button styleType={BtnStyleType.BTN_SUBMIT} type="submit">
            수정
          </Button>
        </St.BtnBox>
      </form>
    </St.ModifyProfileWrapper>
  );
}
