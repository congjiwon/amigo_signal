import { Skeleton } from 'antd';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import useCurrentUserStore from '../../../zustand/currentUser';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import * as St from './style';

export default function Profile() {
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const ageRange = currentUser?.birthday && classifyingAge(currentUser?.birthday as string);
  return (
    <St.ProfileWrapper>
      <St.ProfileBox>
        <St.ProfileImgBox>
          <img src={currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg} alt={`${currentUser?.nickName}님 프로필 이미지`} />
        </St.ProfileImgBox>
        <St.ProfileInfo>
          {currentUser?.birthday === undefined && (
            <div className="skeleton-box">
              <Skeleton paragraph={{ rows: 1 }} active />
            </div>
          )}
          {currentUser?.birthday !== undefined && (
            <>
              <p>{currentUser ? currentUser?.nickName : <Skeleton />}</p>{' '}
              <p>
                {ageRange} | {currentUser?.gender}
              </p>
            </>
          )}
        </St.ProfileInfo>
      </St.ProfileBox>
    </St.ProfileWrapper>
  );
}
