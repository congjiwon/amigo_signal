import { useQuery } from '@tanstack/react-query';
import { Pagination, PaginationProps } from 'antd';
import { useState } from 'react';
import { getMyPartnerPosts } from '../../../api/supabase/partner';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import MyPartnerCard from '../common/myPartnerCard/MyPartnerCard';
import * as StCommon from '../common/style/style';

export default function MyPartnerPost() {
  const userId = localStorage.getItem('authId') as string;
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[0];

  const {
    data: myPartnerPosts,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['myPartnerPosts', userId, filterStatus, currentPage - 1],
    queryFn: () => getMyPartnerPosts({ userId, filterIsOpen: filterStatus, page: currentPage - 1 }),
    enabled: isTabActive,
    keepPreviousData: true,
  });

  const handleClickFilter = (value: boolean | null) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) <div>loading..</div>;
  return (
    <>
      <StCommon.MyFilterBtns>
        <StCommon.MyFilterBtn className={filterStatus === null ? 'active' : ''} onClick={() => handleClickFilter(null)}>
          전체 보기
        </StCommon.MyFilterBtn>
        <StCommon.MyFilterBtn className={filterStatus === true ? 'active' : ''} onClick={() => handleClickFilter(true)}>
          모집중
        </StCommon.MyFilterBtn>
        <StCommon.MyFilterBtn className={filterStatus === false ? 'active' : ''} onClick={() => handleClickFilter(false)}>
          모집 완료
        </StCommon.MyFilterBtn>
      </StCommon.MyFilterBtns>

      {!!myPartnerPosts?.count ? (
        <>
          <StCommon.MyCards>
            {myPartnerPosts?.data?.map((partnerPost) => (
              <MyPartnerCard partnerPost={partnerPost} key={partnerPost.id} />
            ))}
          </StCommon.MyCards>
          <StCommon.PaginationBox>
            <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={myPartnerPosts?.count ? myPartnerPosts.count : 0} onChange={handlePageChange} />
          </StCommon.PaginationBox>
        </>
      ) : filterStatus === null ? (
        <StCommon.MsgNoData>작성한 동행 찾기 글이 없습니다.</StCommon.MsgNoData>
      ) : filterStatus === true ? (
        <StCommon.MsgNoData>모집중인 동행 찾기 작성글이 없습니다.</StCommon.MsgNoData>
      ) : (
        <StCommon.MsgNoData>모집 완료된 동행 찾기 작성글이 없습니다.</StCommon.MsgNoData>
      )}
    </>
  );
}
