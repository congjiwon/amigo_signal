import { useQuery } from '@tanstack/react-query';
import { Pagination, PaginationProps } from 'antd';
import { useState } from 'react';
import { getAppliedPosts } from '../../../api/supabase/partner';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import useSessionStore from '../../../zustand/store';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import MyPartnerCard from '../common/myPartnerCard/MyPartnerCard';
import * as StCommon from '../common/style/style';

export default function AppliedPosts() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[1];

  const { data: appliedPosts, isError } = useQuery({
    queryKey: ['appliedPosts', userId, filterStatus, currentPage - 1],
    queryFn: () => getAppliedPosts({ userId, filterIsAccepted: filterStatus, page: currentPage - 1 }),
    enabled: isTabActive,
    keepPreviousData: true,
  });

  const handleClickFilter = (value: boolean | null) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const appliedPostsData = appliedPosts?.data?.map((data) => data.postId);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <StCommon.MyFilterBtns>
        <StCommon.MyFilterBtn className={filterStatus === null ? 'active' : ''} onClick={() => handleClickFilter(null)}>
          신청중
        </StCommon.MyFilterBtn>
        <StCommon.MyFilterBtn className={filterStatus === true ? 'active' : ''} onClick={() => handleClickFilter(true)}>
          수락됨
        </StCommon.MyFilterBtn>
        <StCommon.MyFilterBtn className={filterStatus === false ? 'active' : ''} onClick={() => handleClickFilter(false)}>
          거절됨
        </StCommon.MyFilterBtn>
      </StCommon.MyFilterBtns>

      {!!appliedPosts?.count ? (
        <>
          <StCommon.MyCards>
            {appliedPostsData?.map((postData) => (
              <MyPartnerCard partnerPost={postData} postUserInfo={true} key={postData.id} />
            ))}
          </StCommon.MyCards>
          <StCommon.PaginationBox>
            <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={appliedPosts?.count ? appliedPosts.count : 0} onChange={handlePageChange} />
          </StCommon.PaginationBox>
        </>
      ) : filterStatus === null ? (
        <StCommon.MsgNoData>신청중인 동행 찾기 참여글이 없습니다.</StCommon.MsgNoData>
      ) : filterStatus === true ? (
        <StCommon.MsgNoData>수락된 동행 찾기 참여글이 없습니다.</StCommon.MsgNoData>
      ) : (
        <StCommon.MsgNoData>거절된 동행 찾기 참여글이 없습니다.</StCommon.MsgNoData>
      )}
    </>
  );
}
