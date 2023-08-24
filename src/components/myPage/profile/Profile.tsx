import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../api/supabase/users';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import { BtnStyleType } from '../../../types/styleTypes';
import useSessionStore, { useModalStore } from '../../../zustand/store';
import Button from '../../common/button/Button';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import Modal from '../../common/modal/Modal';
import ModifyProfile from '../modifyProfile/ModifyProfile';
import * as St from './style';

export default function Profile() {
  const { openedModals, openModal } = useModalStore();
  const session = useSessionStore((state) => state.session);
  console.log(session);
  const userId = session?.user.id;

  const { isLoading, data: currentUser } = useQuery(['partnerCurrentUser'], () => getCurrentUser(userId as string));

  console.log(currentUser);

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
          <img src={currentUser?.profileImageUrl ? currentUser?.profileImageUrl : defaultImg} />
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
