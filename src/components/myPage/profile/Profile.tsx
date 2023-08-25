import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../api/supabase/users';
import useSessionStore, { useModalStore } from '../../../zustand/store';
import ModifyProfile from '../modifyProfile/ModifyProfile';
import Modal from '../../common/modal/Modal';
import Button from '../../common/button/Button';
import { BtnStyleType } from '../../../types/styleTypes';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import * as St from './style';

export default function Profile() {
  const { openedModals, openModal } = useModalStore();
  const session = useSessionStore((state) => state.session);
  console.log(session);
  const userId = session?.user.id;
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  const { isLoading, data: currentUser } = useQuery(['currentUser', userId], () => getCurrentUser(userId as string));

  const ageRange = classifyingAge('1999-01-01');
  return (
    <St.ProfileWrapper>
      <Button styleType={BtnStyleType.BTN_DARK} onClick={() => openModal('modifyProfile')}>
        프로필 수정
      </Button>
      {openedModals.modifyProfile && (
        <Modal id="modifyProfile" size="medium">
          <ModifyProfile />
        </Modal>
      )}
      <St.ProfileBox>
        <St.ProfileImgBox>
          <img src={currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg} />
        </St.ProfileImgBox>
        <div>
          <p>{currentUser?.nickName}</p>
          <p>{currentUser?.gender}</p>
          <p>{ageRange}</p>
        </div>
      </St.ProfileBox>
    </St.ProfileWrapper>
  );
}
