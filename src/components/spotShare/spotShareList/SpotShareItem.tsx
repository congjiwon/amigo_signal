import React, { useEffect, useState } from 'react';
import { Tables } from '../../../api/supabase/supabase';
import { Link } from 'react-router-dom';
import * as St from './style';
import Calendar from '../../../assets/imgs/partner/Calendar.svg';
import { getSpotShareDefaultImg } from '../../../api/supabase/spotshare';
import styled from 'styled-components';

type SpotItemProps = {
  post: Tables<'spotPosts'>;
};

function SpotShareItem({ post }: SpotItemProps) {
  const [countryImg, setCountryImg] = useState<string>('');

  //국가 디폴트 이미지 넣기
  useEffect(() => {
    const getDefaultImgHandler = async () => {
      const { data, error } = await getSpotShareDefaultImg(post.country);
      if (error || !data) {
        console.error('디폴트이미지 가져오는 과정에서 에러 발생', error);
      } else {
        setCountryImg(data[0].imageUrl);
      }
    };
    getDefaultImgHandler();
  }, []);

  //방문날짜 2023-05-05 => 2023년 5월 5일 바꾸는 로직
  const visitDate = post.visitDate.split('-');
  if (visitDate[1][0] == '0') {
    visitDate[1] = visitDate[1].substring(1);
  }
  if (visitDate[2][0] == '0') {
    visitDate[2] = visitDate[2].substring(1);
  }

  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.TravelDateBox>
          <img style={{ paddingLeft: '21px' }} src={Calendar} alt="방문날짜" />
          <p>
            {visitDate[0]}년 {visitDate[1]}월 {visitDate[2]}일
          </p>
        </St.TravelDateBox>
        <St.TitleBox>
          <h1>{post.title}</h1>
        </St.TitleBox>
        <St.ContentBox>
          <p>{post.content}</p>
        </St.ContentBox>
        <DefaultImg src={countryImg}></DefaultImg>
        <St.Span>{post.country}</St.Span>
      </St.PostCard>
    </Link>
  );
}

export default SpotShareItem;

const DefaultImg = styled.img`
  width: 282px;
  height: 143px;
  object-fit: cover;

  border-radius: 0px 0px 30px 30px;
`;
