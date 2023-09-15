import { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { updatePostStatus } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import Calender from '../../../assets/imgs/partner/Calendar.svg';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import * as St from './style';
type PartnerItemProps = {
  post: Tables<'partnerPosts'>;
};

const PartnerItem = ({ post }: PartnerItemProps) => {
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  const { country } = post;
  const { users } = post;

  // 자동 모집완료 로직 (여행 기간 endDate)
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (post) {
      const endDate = new Date(post.endDate);
      endDate.setHours(0, 0, 0, 0);
      if (endDate < currentDate) {
        updatePostStatus(post.id!, false);
      }
    }
  }, [post]);

  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.LocationBox>
          <St.FlagBox>{country.flagUrl && <St.FlagImage src={country.flagUrl} alt={`${post?.country.country!} 국기`} />}</St.FlagBox>
          <St.Country>{post?.country.country!}</St.Country>
          {post.isOpen === false ? (
            <St.CheckBox style={{ color: '#643bdc' }}>
              <FiCheck />
              <span>모집완료</span>
            </St.CheckBox>
          ) : (
            ''
          )}
        </St.LocationBox>
        <St.Main>
          <St.TravelDate>
            <img src={Calender} alt="여행기간" />
            <p>
              {post.startDate} ~ {post.endDate}
            </p>
          </St.TravelDate>
          <St.TitleBox>
            <p>{post.title}</p>
          </St.TitleBox>
        </St.Main>
        <St.Footer>
          <St.UserProfile>
            {users.profileImageUrl ? <St.ProfileImage src={`${storagaUrl}/${users?.profileImageUrl}`} alt="profile" /> : <St.ProfileImage src={defaultProfileImage} alt="profile" />}
            <p>{users?.nickName!}</p>
          </St.UserProfile>
          <St.WriterInfoBox>
            <p>
              {classifyingAge(users?.birthday)} | {users?.gender}
            </p>
          </St.WriterInfoBox>
        </St.Footer>
      </St.PostCard>
    </Link>
  );
};

export default PartnerItem;
