import { useQuery } from '@tanstack/react-query';
import { getMyPartnerPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as StCommon from '../common/style/style';
import { Pagination, PaginationProps } from 'antd';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';

export default function MyPartnerPost() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isTabActive = useMyPageTabPanel((state) => state.active)[0];

  const { data: myPartnerPosts, isError } = useQuery({
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
              <StCommon.MyCard key={partnerPost.id}>
                <Link to={`/partner/detail/${partnerPost.id}`}>
                  <StCommon.FlexBetween className="partner-top">
                    <StCommon.CountryInfo>
                      <div>
                        <img src="" alt={`${partnerPost.country} 국기`} />
                      </div>
                      <p>{partnerPost.country}</p>
                    </StCommon.CountryInfo>
                    <StCommon.OpenStatus>{partnerPost.isOpen ? `모집중` : `모집완료`}</StCommon.OpenStatus>
                  </StCommon.FlexBetween>

                  <StCommon.DateInfo>
                    {partnerPost.startDate} ~ {partnerPost.endDate}
                  </StCommon.DateInfo>

                  <StCommon.CardTitle className="partner-title">{partnerPost.title}</StCommon.CardTitle>

                  <StCommon.FlexBetween>
                    <StCommon.InterestList>
                      {partnerPost.interestUrl.map((url) => (
                        <li>
                          <img src={url} />
                        </li>
                      ))}
                    </StCommon.InterestList>
                    <StCommon.numOfPeople>
                      모집인원 <span>{partnerPost.numOfPeople}</span>
                    </StCommon.numOfPeople>
                  </StCommon.FlexBetween>
                </Link>
              </StCommon.MyCard>
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
