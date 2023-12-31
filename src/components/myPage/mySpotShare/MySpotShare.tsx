import { useQuery } from '@tanstack/react-query';
import { Pagination, PaginationProps } from 'antd';
import { useState } from 'react';
import { getMySpotSharePosts } from '../../../api/supabase/spotshare';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import MySpotShareCard from '../common/mySpotShareCard/MySpotShareCard';
import * as StCommon from '../common/style/style';

export default function MySpotShare() {
  const userId = localStorage.getItem('authId') as string;
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[3];

  const {
    data: mySpotSharePosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mySpotSharePosts', userId, currentPage - 1],
    queryFn: () => getMySpotSharePosts({ writerId: userId, page: currentPage - 1 }!),
    enabled: isTabActive,
    keepPreviousData: true,
  });

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {!!mySpotSharePosts?.count ? (
        <>
          <StCommon.MyCards>
            {mySpotSharePosts?.data?.map((spotSharePost) => (
              <MySpotShareCard spotSharePost={spotSharePost} key={spotSharePost.id} />
            ))}
          </StCommon.MyCards>
          <StCommon.PaginationBox>
            <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={mySpotSharePosts?.count ? mySpotSharePosts.count : 0} onChange={handlePageChange} />
          </StCommon.PaginationBox>
        </>
      ) : (
        <StCommon.MsgNoData>작성한 스팟 공유 글이 없습니다.</StCommon.MsgNoData>
      )}
    </div>
  );
}
