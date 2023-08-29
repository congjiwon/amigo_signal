import { useModalStore } from '../../../zustand/store';
import ModifyProfile from '../modifyProfile/ModifyProfile';
import Modal from '../../common/modal/Modal';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import * as St from './style';
import useCurrentUserStore from '../../../zustand/currentUser';

export default function Profile() {
  const { openedModals, openModal } = useModalStore();
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const ageRange = classifyingAge(currentUser?.birthday as string);
  return (
    <St.ProfileWrapper>
      <St.ProfileBox>
        {/* TODO: 이미지 스타일 동그라미에 꽉차게 변경 */}
        <St.ProfileImgBox>
          <img src={currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg} />
        </St.ProfileImgBox>
        <St.ProfileInfo>
          <p>{currentUser?.nickName}</p>
          <p>
            {ageRange} | {currentUser?.gender}
          </p>
        </St.ProfileInfo>
      </St.ProfileBox>
      <button onClick={() => openModal('modifyProfile')}>프로필 수정</button>
      {openedModals.modifyProfile && (
        <Modal id="modifyProfile" size="medium">
          <ModifyProfile />
        </Modal>
      )}
    </St.ProfileWrapper>
  );
}
