import { useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { modifyProfileImg } from '../../../api/supabase/storage';
import { duplicationCheckFromUserTable, updateUserNickname, updateUserProfileImgUrl } from '../../../api/supabase/users';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import { BtnStyleType } from '../../../types/styleTypes';
import useCurrentUserStore from '../../../zustand/currentUser';
import useSessionStore from '../../../zustand/store';
import Button from '../../common/button/Button';
import { Alert } from '../../common/modal/alert';
import * as St from './style';

export default function ModifyProfile() {
  const queryClient = useQueryClient();
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const [nickName, setNickName] = useState<string | undefined>(currentUser?.nickName);
  const [nickNameValidationMsg, setNickNameValidationMsg] = useState<string | null>('');
  const [nickNameStatus, setNickNameStatus] = useState<boolean>(true);
  const [profileImgUrl, setProfileImgUrl] = useState<string | undefined>(currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg);
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);

  useEffect(() => {
    setNickName(currentUser?.nickName);
    setProfileImgUrl(currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg);
  }, [currentUser]);

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

  const debouncedCheckDuplicate = debounce(async (value) => {
    const duplicationCheck = await duplicationCheckFromUserTable({ columnName: 'nickName', value: value });

    if (duplicationCheck) {
      setNickNameValidationMsg('이미 사용중인 닉네임입니다.');
      setNickNameStatus(false);
    }
  }, 100);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedNickname = e.target.value.trim();
    setNickName(typedNickname);
    debouncedCheckDuplicate(typedNickname);

    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/.test(typedNickname);
    if (regex) {
      setNickNameValidationMsg('사용가능한 닉네임입니다.');
      setNickNameStatus(true);
    } else {
      setNickNameValidationMsg('특수문자 제외, 2~8자리');
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
      const encodeEmail = currentUser?.email && btoa(currentUser?.email);
      const fileNewName = uuidv4();
      try {
        const storageData = await modifyProfileImg({ userEmail: encodeEmail!, fileNewName, newFille: profileImgFile });
        profileUrl = storageData?.path;
        mutationImgUrl.mutate({ profileImageUrl: profileUrl, userId });
      } catch (error) {
        Alert({ title: '에러가 발생하여 정상적으로 수정하지 못하였습니다.' });
      }
    }

    Alert({ title: '수정이 완료되었습니다.' });
  };

  return (
    <St.ModifyProfileWrapper>
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
          <Button styleType={BtnStyleType.BTN_SUBMIT} type="submit" disabled={!nickNameStatus}>
            수정
          </Button>
        </St.BtnBox>
      </form>
    </St.ModifyProfileWrapper>
  );
}
