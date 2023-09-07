import { useQuery } from '@tanstack/react-query';
import { Pagination, PaginationProps } from 'antd';
import { useState } from 'react';
import { getBookmarkedPosts } from '../../../api/supabase/partner';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import MyPartnerCard from '../common/myPartnerCard/MyPartnerCard';
import * as StCommon from './../common/style/style';

export default function BookmarkedPosts() {
  const userId = localStorage.getItem('authId') as string;
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[2];

  const { data: bookmarkedData, isError } = useQuery({
    queryKey: ['bookmarkedPosts', userId, currentPage - 1],
    queryFn: () => getBookmarkedPosts({ userId, page: currentPage - 1 }),
    enabled: isTabActive,
    keepPreviousData: true,
  });

  const bookmarkedPosts = bookmarkedData?.data?.map((item) => item.postId);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {!!bookmarkedData?.count ? (
        <>
          <StCommon.MyCards>
            {bookmarkedPosts?.map((post) => (
              <MyPartnerCard partnerPost={post} postUserInfo={true} key={post.id} />
            ))}
          </StCommon.MyCards>
          <StCommon.PaginationBox>
            <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={bookmarkedData?.count ? bookmarkedData.count : 0} onChange={handlePageChange} />
          </StCommon.PaginationBox>
        </>
      ) : (
        <StCommon.MsgNoData>북마크한 동행 찾기 글이 없습니다.</StCommon.MsgNoData>
      )}
    </>
  );
}
