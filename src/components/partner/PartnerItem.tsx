import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tables } from '../../api/supabase/supabase';
import * as St from './style';

type PartnerItemProps = {
  post: Tables<'partnerPosts'>;
};

const PartnerItem = ({ post }: PartnerItemProps) => {
  const [imageSrc, setImageSrc] = useState<string>('');

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

  const getAgeCategory = (birthday: string) => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear() - (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) ? 1 : 0);

    if (age >= 10 && age < 20) {
      return '10대';
    }
    if (age >= 20 && age < 30) {
      return '20대';
    }
    if (age >= 30 && age < 40) {
      return '30대';
    }
    if (age >= 40 && age < 50) {
      return '40대';
    }
    if (age >= 50 && age < 60) {
      return '50대';
    }
    if (age >= 60 && age < 70) {
      return '60대';
    }
    if (age >= 70 && age < 80) {
      return '70대';
    }
  };

  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.Head>
          <St.Location>
            <St.FlagBox>{imageSrc && <St.FlagImage src={imageSrc} alt="Image" />}</St.FlagBox>
            <h1>{post.country}</h1>
          </St.Location>
          <St.Status isOpen={post.isOpen}>{post.isOpen ? '모집중' : '모집완료'}</St.Status>
        </St.Head>
        <St.Main>
          <p>
            여행기간 | {post.startDate} ~ {post.endDate}
          </p>
          <h1>{post.title}</h1>
        </St.Main>
        <St.Body>
          <picture>
            {post.interestUrl.map((url, index) => (
              <St.InterestImage key={index} src={url} alt={`interest-${index}`} />
            ))}
          </picture>
          <p>모집인원: {post.numOfPeople}명</p>
        </St.Body>
        <St.Footer>
          <St.UserProfile>
            {post.users.profileImageUrl && <St.ProfileImage src={post.users.profileImageUrl} alt="profile" />}
            <p>{post.users.nickName}</p>
          </St.UserProfile>
          <div>
            <p>
              {getAgeCategory(post.users.birthday)} | {post.users.gender === 'woman' ? '여성' : '남성'}
            </p>
          </div>
        </St.Footer>
      </St.PostCard>
    </Link>
  );
};

export default PartnerItem;