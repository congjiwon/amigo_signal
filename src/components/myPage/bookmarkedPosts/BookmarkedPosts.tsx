import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getBookmarkedPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import { Pagination, PaginationProps } from 'antd';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import classifyingAge from '../../common/classifyingAge/classifyingAge';

export default function BookmarkedPosts() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[2];

  const {
    data: bookmarkedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['bookmarkedPosts', userId, currentPage - 1],
    queryFn: () => getBookmarkedPosts({ userId, page: currentPage - 1 }),
    enabled: isTabActive,
  });

  const bookmarkedPosts = bookmarkedData?.data?.map((item) => item.postId);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      {bookmarkedPosts?.map((post) => (
        <div style={{ border: '1px solid red' }}>
          <div>{post.id}</div>
          <div>{post.isOpen}</div>
          <div>{post.startDate}</div>
          <div>{post.endDate}</div>
          <div>{post.title}</div>
          <div>
            {post.interestUrl.map((url) => (
              <img style={{ width: '50px' }} src={url} alt="" />
            ))}
          </div>
          <div>{post.numOfPeople}</div>
          <div>{post.writerId.nickName}</div>
          <div>{classifyingAge(post.writerId.birthday)}</div>
          <div>{post.writerId.gender}</div>
        </div>
      ))}
      <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={bookmarkedData?.count ? bookmarkedData.count : 0} onChange={handlePageChange} />
    </div>
  );
}
