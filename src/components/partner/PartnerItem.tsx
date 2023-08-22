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

  // 작성시간(createAt) -> 시간 경과 렌더링하도록 변경
  const timeAgo = (createDate: string) => {
    const date = new Date(createDate);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const timeUnits = [
      { value: days, unit: '일' },
      { value: hours, unit: '시간' },
      { value: minutes, unit: '분' },
      { value: seconds, unit: '초' },
    ];

    const result = timeUnits.find((unit) => unit.value > 0) || timeUnits[timeUnits.length - 1];
    return `${result.value}${result.unit} 전`;
  };

  // 필요한 정보: title, startDate, endDate, numOfPeople, isOpen, createdAt, country
  // 가공 필요 -> writerId, interestUrl
  // 필요 없는 정보: id, content, applicant, openChat, region

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
          <p>{timeAgo(post.createdAt)}</p>
        </St.Footer>
      </St.PostCard>
    </Link>
  );
};

export default PartnerItem;
