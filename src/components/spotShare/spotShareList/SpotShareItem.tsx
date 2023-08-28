import React from 'react';
import { Tables } from '../../../api/supabase/supabase';
import { Link } from 'react-router-dom';
import * as St from './style';
import Calendar from '../../../assets/imgs/partner/Calendar.svg';
type SpotItemProps = {
  post: Tables<'spotPosts'>;
};

function SpotShareItem({ post }: SpotItemProps) {
  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.TravelDateBox>
          <img style={{ paddingLeft: '21px' }} src={Calendar} alt="방문날짜" />
          <p>{post.visitDate}</p>
        </St.TravelDateBox>
        <St.TitleBox>
          <h1>{post.title}</h1>
        </St.TitleBox>
        <St.ContentBox>
          <p>{post.content}</p>
        </St.ContentBox>
      </St.PostCard>
    </Link>
  );
}

export default SpotShareItem;
