import { useQuery } from '@tanstack/react-query';
import { getAppliedPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as St from './style';

interface Post {
  id: string;
  writerId: string;
  title: string;
  content: string;
  numOfPeople: number;
  startDate: string;
  endDate: string;
  isOpen: boolean;
  openChat: string;
  createdAt: string;
  interestUrl: string[];
  region: string;
  country: string;
}

export default function AppliedPosts() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);

  const { data: appliedPosts, isLoading, isError } = useQuery(['appliedPosts', userId, filterStatus], () => getAppliedPosts({ userId, filterIsAccepted: filterStatus }));

  const handleClickFilter = (value: boolean | null) => {
    setFilterStatus(value);
  };
  let appliedPostsData: Post[] = [];

  if (appliedPosts) {
    appliedPostsData = appliedPosts.map((data) => data.postId as Post);
  }

  return (
    <St.AppliedPostsSection>
      <h2>동행 찾기 참여글</h2>
      <St.FilterBtns>
        <St.FilterBtn className={filterStatus === null ? 'active' : ''} onClick={() => handleClickFilter(null)}>
          신청중
        </St.FilterBtn>
        <St.FilterBtn className={filterStatus === true ? 'active' : ''} onClick={() => handleClickFilter(true)}>
          수락됨
        </St.FilterBtn>
        <St.FilterBtn className={filterStatus === false ? 'active' : ''} onClick={() => handleClickFilter(false)}>
          거절됨
        </St.FilterBtn>
      </St.FilterBtns>

      <St.AppliedPostCardList>
        {appliedPostsData?.map((postData: Post) => {
          return (
            <St.AppliedPostCard>
              <Link to={`/partner/detail/${postData.id}`}>
                <div>{postData.country}</div>
                <div>{`${postData.isOpen ? `모집중` : `모집마감`}`}</div>
                <div>{`${postData.startDate} ~ ${postData.endDate}`}</div>
                <div>{postData.title}</div>
                {postData.interestUrl.map((url) => (
                  <img src={url} />
                ))}
                <div>모집인원 {postData.numOfPeople}</div>
              </Link>
            </St.AppliedPostCard>
          );
        })}
      </St.AppliedPostCardList>
    </St.AppliedPostsSection>
  );
}
