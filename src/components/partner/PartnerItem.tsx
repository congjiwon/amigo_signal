import { useEffect, useState } from 'react';
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
  const [flagImg, setFlagImg] = useState<string>('');

  // const { data: confirmedApplicants } = useQuery(['confirmedApplicants', post.id], () => getConfirmedApplicantList(post.id!));

  // useEffect(() => {
  //   const getFlagImgHandle = async () => {
  // const { data, error } = await getFlag(post.country);
  //     if (error || !data) {
  //       console.error('깃발 가져오는 과정에서 에러 발생', error);
  //     } else {
  //       setFlagImg(data[0].flagUrl);
  //     }
  //   };
  //   getFlagImgHandle();
  // }, []);

  // 자동 모집완료 로직 (여행 기간 endDate)
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (post) {
      const endDate = new Date(post.endDate);
      endDate.setHours(0, 0, 0, 0);
      if (endDate < currentDate) {
        updatePostStatus(post.id!, false);
      } else if (endDate >= currentDate) {
        updatePostStatus(post.id!, true);
      }
    }
  }, [post]);

  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.Location>
          <St.FlagBox>{flagImg && <St.FlagImage src={flagImg} alt="Image" />}</St.FlagBox>
          <h1>{post.country}</h1>
        </St.Location>
        <St.Main>
          <St.TravelDate>
            <img src={Calender} alt="여행기간" />
            <p>
              {post.startDate} ~ {post.endDate}
            </p>
          </St.TravelDate>
          <St.TitleBox>
            <h1>{post.title}</h1>
          </St.TitleBox>
        </St.Main>
        <St.Body>
          <St.Status $isOpen={post.isOpen}>{post.isOpen ? '모집중' : '모집완료'}</St.Status>
          <p>모집인원: {post.numOfPeople}명</p>
        </St.Body>
        <St.Footer>
          <St.UserProfile>
            {post.users.profileImageUrl ? <St.ProfileImage src={`${storagaUrl}/${post.users.profileImageUrl}`} alt="profile" /> : <St.ProfileImage src={defaultProfileImage} alt="profile" />}
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
