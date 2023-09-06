import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updatePostStatus } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';
import Calender from '../../assets/imgs/partner/Calendar.svg';
import defaultProfileImage from '../../assets/imgs/users/default_profile_img.png';
import classifyingAge from '../common/classifyingAge/classifyingAge';
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
        <St.Location>
          <St.FlagBox>{country.flagUrl && <St.FlagImage src={country.flagUrl} alt="Image" />}</St.FlagBox>
          <St.Country>{post?.country.country!}</St.Country>
        </St.Location>
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
        <St.Body>
          <St.Status $isOpen={post.isOpen}>{post.isOpen ? '모집중' : '모집완료'}</St.Status>
          <p>모집인원: {post.numOfPeople}명</p>
        </St.Body>
        <St.Footer>
          <St.UserProfile>
            {users.profileImageUrl ? <St.ProfileImage src={`${storagaUrl}/${users.profileImageUrl}`} alt="profile" /> : <St.ProfileImage src={defaultProfileImage} alt="profile" />}
            <p>{post.users?.nickName!}</p>
          </St.UserProfile>
          <St.WriterInfoBox>
            <p>
              {classifyingAge(post.users?.birthday)} | {post.users?.gender}
            </p>
          </St.WriterInfoBox>
        </St.Footer>
      </St.PostCard>
    </Link>
  );
};

export default PartnerItem;
