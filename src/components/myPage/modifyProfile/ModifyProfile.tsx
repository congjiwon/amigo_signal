import { useMutation, useQueryClient } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { modifyProfileImg } from '../../../api/supabase/storage';
import { duplicationCheckFromUserTable, updateUserNickname, updateUserProfileImgUrl } from '../../../api/supabase/users';
import iconProfileImgBtn from '../../../assets/imgs/myPage/icon_profile_img_btn.png';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import useCurrentUserStore from '../../../zustand/currentUser';
import { Alert } from '../../common/modal/alert';
import * as St from './style';

export default function ModifyProfile() {
  const queryClient = useQueryClient();
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const userId = localStorage.getItem('authId') as string;
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
    var reg = /(.*?)\.(jpg|svg|jpeg|png)$/;
    if (selectedFile) {
      const selectedFileName = e.target.files?.[0].name;

      if (selectedFileName?.match(reg) === null || reg.test(selectedFileName!) === false) {
        alert('jpg, jpeg, png, svg 형식의 이미지 파일만 업로드 가능합니다.');
        return;
      } else {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 640,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(selectedFile, options);
          setProfileImgUrl(URL.createObjectURL(selectedFile));
          setProfileImgFile(compressedFile);
        } catch (error) {}
      }
    }
  };

  const handleResetModifyProfile = () => {
    setNickName(currentUser?.nickName);
    setNickNameValidationMsg('');
    setNickNameStatus(true);
    setProfileImgUrl(currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg);
    setProfileImgFile(null);
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
          <St.ProfileImgBox>
            <St.PreviewProfileImg src={profileImgUrl} alt="선택 이미지 미리보기" />

            <St.ProfileImgLabel className="btn-profile-label" htmlFor="profileImg">
              <img src={iconProfileImgBtn} alt="이미지 선택 아이콘" />
            </St.ProfileImgLabel>

            <input type="file" name="" id="profileImg" accept="image/*" onChange={handleFileChange} />
          </St.ProfileImgBox>

          <div style={{ width: '100%' }}>
            <St.ProfileNicknameLabelBox>
              <label htmlFor="">닉네임</label>
              <St.MofifyNickNameMsg $validationStatus={nickNameStatus}>{nickNameValidationMsg}</St.MofifyNickNameMsg>
            </St.ProfileNicknameLabelBox>
            <St.ProfileNicknameInput type="text" value={nickName} onChange={handleOnChange} />
          </div>
        </St.ModifyProfileBox>
        <St.BtnBox>
          <St.Btn type="reset" onClick={handleResetModifyProfile} $width="65px" $height="32px" $bgColor="#6C7486">
            취소
          </St.Btn>
          <St.Btn type="submit" disabled={!nickNameStatus} $width="65px" $height="32px" $bgColor="#643BDC">
            적용
          </St.Btn>
        </St.BtnBox>
      </form>
    </St.ModifyProfileWrapper>
  );
}
