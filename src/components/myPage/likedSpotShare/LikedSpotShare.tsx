import { useState } from 'react';
import useSessionStore from '../../../zustand/store';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import { useQuery } from '@tanstack/react-query';
import { getLikedSpotShare } from '../../../api/supabase/spotshare';
import { Pagination, PaginationProps } from 'antd';
import * as StCommon from '../common/style/style';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import MySpotShareCard from '../common/mySpotShareCard/MySpotShareCard';

export default function LikedSpotShare() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[4];

  const { data: likedSpotShare, isError } = useQuery({
    queryKey: ['likedSpotShare', userId, currentPage - 1],
    queryFn: () => getLikedSpotShare({ userId, page: currentPage - 1 }),
    enabled: isTabActive,
    keepPreviousData: true,
  });

  const likedPosts = likedSpotShare?.data?.map((item) => item.postId);
  console.log(likedPosts);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {!!likedSpotShare?.count ? (
        <>
          <StCommon.MyCards>
            {likedPosts?.map((post) => (
              <MySpotShareCard spotSharePost={post} key={post.id} />
            ))}
          </StCommon.MyCards>
          <StCommon.PaginationBox>
            <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={likedSpotShare?.count ? likedSpotShare.count : 0} onChange={handlePageChange} />
          </StCommon.PaginationBox>
        </>
      ) : (
        <StCommon.MsgNoData>좋아요한 스팟 공유 글이 없습니다.</StCommon.MsgNoData>
      )}
    </>
  );
}
