import { useQuery } from '@tanstack/react-query';
import { getAppliedPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as StCommon from '../common/style/style';
import { Pagination, PaginationProps } from 'antd';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

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
            {appliedPostsData?.map((postData) => {
              return (
                <StCommon.MyCard>
                  <Link to={`/partner/detail/${postData.id}`}>
                    <StCommon.FlexBetween className="partner-top">
                      <StCommon.CountryInfo>
                        <div>
                          <img src="" alt={`${postData.country} 국기`} />
                        </div>
                        <p>{postData.country}</p>
                      </StCommon.CountryInfo>
                      <StCommon.OpenStatus>{postData.isOpen ? `모집중` : `모집완료`}</StCommon.OpenStatus>
                    </StCommon.FlexBetween>

                    <StCommon.DateInfo>
                      {postData.startDate} ~ {postData.endDate}
                    </StCommon.DateInfo>

                    <StCommon.CardTitle className="partner-title">{postData.title}</StCommon.CardTitle>

                    <StCommon.FlexBetween>
                      <StCommon.InterestList>
                        {postData.interestUrl.map((url) => (
                          <li>
                            <img src={url} />
                          </li>
                        ))}
                      </StCommon.InterestList>
                      <StCommon.numOfPeople>
                        모집인원 <span>{postData.numOfPeople}</span>
                      </StCommon.numOfPeople>
                    </StCommon.FlexBetween>

                    <StCommon.FlexBetween className="partner-bottom">
                      <StCommon.UserInfoMain>
                        <div>
                          <img src={postData.writerId.profileImageUrl ? `${storagaUrl}/${postData.writerId.profileImageUrl}` : defaultImg} />
                        </div>
                        <p>{postData.writerId.nickName}</p>
                      </StCommon.UserInfoMain>
                      <StCommon.UserInfoSub>
                        {postData.writerId.gender} | {classifyingAge(postData.writerId.birthday)}
                      </StCommon.UserInfoSub>
                    </StCommon.FlexBetween>
                  </Link>
                </StCommon.MyCard>
              );
            })}
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
