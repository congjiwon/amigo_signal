import { useQuery } from '@tanstack/react-query';
import { getMyPartnerPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as St from './style';

export default function MyPartnerPost() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);

  const { data: myPartnerPosts, isLoading, isError } = useQuery(['myPartnerPosts', userId, filterStatus], () => getMyPartnerPosts({ userId, filterIsOpen: filterStatus }));

  const handleClickFilter = (value: boolean | null) => {
    setFilterStatus(value);
  };

  return (
    <St.MyPartnerPostsWrapper>
      <St.FilterBtns>
        <St.FilterBtn className={filterStatus === null ? 'active' : ''} onClick={() => handleClickFilter(null)}>
          전체
        </St.FilterBtn>
        <St.FilterBtn className={filterStatus === true ? 'active' : ''} onClick={() => handleClickFilter(true)}>
          모집중
        </St.FilterBtn>
        <St.FilterBtn className={filterStatus === false ? 'active' : ''} onClick={() => handleClickFilter(false)}>
          모집마감
        </St.FilterBtn>
      </St.FilterBtns>
      <St.MyPartnerPostCardList>
        {myPartnerPosts?.map((partnerPost) => (
          <St.MyPartnerPostCard key={partnerPost.id}>
            <Link to={`/partner/detail/${partnerPost.id}`}>
              <div>title: {partnerPost.title}</div>
              <div>content: {partnerPost.content}</div>
              <div>region: {partnerPost.region}</div>
              <div>country: {partnerPost.country}</div>
              <div>startDate: {partnerPost.startDate}</div>
              <div>endDate: {partnerPost.endDate}</div>
              <div>numOfPpl: {partnerPost.numOfPeople}</div>
            </Link>
          </St.MyPartnerPostCard>
        ))}
      </St.MyPartnerPostCardList>
    </St.MyPartnerPostsWrapper>
  );
}
