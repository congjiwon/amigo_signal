import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getBookmarkedPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import { Pagination, PaginationProps } from 'antd';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import * as StCommon from './../common/style/style';
import MyPartnerCard from '../common/myPartnerCard/MyPartnerCard';

export default function BookmarkedPosts() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
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
