import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConfirmedApplicantList, updatePostStatus } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';
import Calender from '../../assets/imgs/partner/Calendar.svg';
import defaultProfileImage from '../../assets/imgs/users/default_profile_img.png';
import classifyingAge from '../common/classifyingAge/classifyingAge';
import * as St from './style';

type PartnerItemProps = {
  post: Tables<'partnerPosts'>;
};

const PartnerItem = ({ post }: PartnerItemProps) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  const { data: confirmedApplicants } = useQuery(['confirmedApplicants', post.id], () => getConfirmedApplicantList(post.id!));

  // 동행찾기 게시글작성할 때 선택한 country
  let filteredCountry = post.country;
  if (post.country === '미국') {
    filteredCountry = '미합중국';
  } else if (post.country === '베네수엘라') {
    filteredCountry = '베네수엘라볼리바르';
  } else if (post.country === '네팔') {
    filteredCountry = '네팔연방';
  } else if (post.country === '터키') {
    filteredCountry = '튀르키예공화국';
  }

  // 국기 api key
  const API_KEY = process.env.REACT_APP_API_KEY;

  // 국기 이미지 가져오기
  const getFlagAndDisplayImage = async (): Promise<void> => {
    const url = `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${API_KEY}&pageNo=1&numOfRows=227&cond[country_nm::EQ]=${filteredCountry}`;

    const response = await axios.get(url);
    const imageUrl = response.data.data[0].download_url;

    setImageSrc(imageUrl);
  };

  useEffect(() => {
    getFlagAndDisplayImage();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    if (post && confirmedApplicants) {
      const endDate = new Date(post.endDate);
      if (endDate < currentDate || confirmedApplicants.data!.length >= post.numOfPeople) {
        updatePostStatus(post.id!, false);
      } else if (endDate >= currentDate || confirmedApplicants.data!.length < post.numOfPeople) {
        updatePostStatus(post.id!, true);
      }
    }
  }, [post, confirmedApplicants]);

  console.log();
  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.Location>
          <St.FlagBox>{imageSrc && <St.FlagImage src={imageSrc} alt="Image" />}</St.FlagBox>
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
          <St.Status isOpen={post.isOpen}>{post.isOpen ? '모집중' : '모집완료'}</St.Status>
          <p>모집인원: {post.numOfPeople}명</p>
        </St.Body>
        <St.Footer>
          <St.UserProfile>
            {post.users.profileImageUrl ? <St.ProfileImage src={`${storagaUrl}/${post.users.profileImageUrl}`} alt="profile" /> : <St.ProfileImage src={defaultProfileImage} alt="profile" />}
            <p>{post.users?.nickName!}</p>
          </St.UserProfile>
          <div>
            <p>
              {classifyingAge(post.users?.birthday)} | {post.users?.gender}
            </p>
          </div>
        </St.Footer>
      </St.PostCard>
    </Link>
  );
};

export default PartnerItem;
