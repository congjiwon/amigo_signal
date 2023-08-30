import { useQuery } from '@tanstack/react-query';
import { getMyPartnerPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as St from './style';
import { Pagination, PaginationProps } from 'antd';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';

export default function MyPartnerPost() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[0];

  const {
    data: myPartnerPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['myPartnerPosts', userId, filterStatus, currentPage - 1],
    queryFn: () => getMyPartnerPosts({ userId, filterIsOpen: filterStatus, page: currentPage - 1 }),
    enabled: isTabActive,
  });

  const handleClickFilter = (value: boolean | null) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  return (
    <St.MyPartnerPostsSection>
      <h2>동행 찾기 작성글</h2>
      <St.FilterBtns>
        <St.FilterBtn className={filterStatus === null ? 'active' : ''} onClick={() => handleClickFilter(null)}>
          전체 보기
        </St.FilterBtn>
        <St.FilterBtn className={filterStatus === true ? 'active' : ''} onClick={() => handleClickFilter(true)}>
          모집중
        </St.FilterBtn>
        <St.FilterBtn className={filterStatus === false ? 'active' : ''} onClick={() => handleClickFilter(false)}>
          모집 완료
        </St.FilterBtn>
      </St.FilterBtns>

      {!!myPartnerPosts?.count ? (
        <>
          <St.MyPartnerPostCardList>
            {myPartnerPosts?.data?.map((partnerPost) => (
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
          <Pagination current={currentPage} defaultPageSize={NUMBER_OF_ITEMS} total={myPartnerPosts?.count ? myPartnerPosts.count : 0} onChange={handlePageChange} />
        </>
      ) : filterStatus === null ? (
        <div>작성한 동행 찾기 글이 없습니다.</div>
      ) : filterStatus === true ? (
        <div>모집중인 동행 찾기 작성글이 없습니다.</div>
      ) : (
        <div>모집 완료된 동행 찾기 작성글이 없습니다.</div>
      )}
    </St.MyPartnerPostsSection>
  );
}
