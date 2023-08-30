import { useQuery } from '@tanstack/react-query';
import { getAppliedPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as St from './style';
import { Pagination, PaginationProps } from 'antd';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';

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
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[1];

  const {
    data: appliedPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['appliedPosts', userId, filterStatus, currentPage - 1],
    queryFn: () => getAppliedPosts({ userId, filterIsAccepted: filterStatus, page: currentPage - 1 }),
    enabled: isTabActive,
  });

  const handleClickFilter = (value: boolean | null) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };
  let appliedPostsData: Post[] = [];

  if (appliedPosts?.data) {
    appliedPostsData = appliedPosts?.data.map((data) => data.postId as Post);
  }

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

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

      {!!appliedPosts?.count ? (
        <>
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
          <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={appliedPosts?.count ? appliedPosts.count : 0} onChange={handlePageChange} />
        </>
      ) : filterStatus === null ? (
        <div>신청중인 동행 찾기 참여글이 없습니다.</div>
      ) : filterStatus === true ? (
        <div>수락된 동행 찾기 참여글이 없습니다.</div>
      ) : (
        <div>거절된 동행 찾기 참여글이 없습니다.</div>
      )}
    </St.AppliedPostsSection>
  );
}
