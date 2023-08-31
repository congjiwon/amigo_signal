import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getBookmarkedPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import { Pagination, PaginationProps } from 'antd';
import { NUMBER_OF_ITEMS } from '../../common/getRangePagination/getRangePagination';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import * as StCommon from './../common/style/style';
import { Link } from 'react-router-dom';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

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
              <StCommon.MyCard>
                <Link to={`/partner/detail/${post.id}`}>
                  <StCommon.FlexBetween className="partner-top">
                    <StCommon.CountryInfo>
                      <div>
                        <img src="" alt={`${post.country} 국기`} />
                      </div>
                      <p>{post.country}</p>
                    </StCommon.CountryInfo>
                    <StCommon.OpenStatus>{post.isOpen ? `모집중` : `모집완료`}</StCommon.OpenStatus>
                  </StCommon.FlexBetween>

                  <StCommon.DateInfo>
                    {post.startDate} ~ {post.endDate}
                  </StCommon.DateInfo>

                  <StCommon.CardTitle className="partner-title">{post.title}</StCommon.CardTitle>

                  <StCommon.FlexBetween>
                    <StCommon.InterestList>
                      {post.interestUrl.map((url) => (
                        <li>
                          <img src={url} />
                        </li>
                      ))}
                    </StCommon.InterestList>
                    <StCommon.numOfPeople>
                      모집인원 <span>{post.numOfPeople}</span>
                    </StCommon.numOfPeople>
                  </StCommon.FlexBetween>

                  <StCommon.FlexBetween className="partner-bottom">
                    <StCommon.UserInfoMain>
                      <div>
                        <img src={post.writerId.profileImageUrl ? `${storagaUrl}/${post.writerId.profileImageUrl}` : defaultImg} />
                      </div>
                      <p>{post.writerId.nickName}</p>
                    </StCommon.UserInfoMain>
                    <StCommon.UserInfoSub>
                      {post.writerId.gender} | {classifyingAge(post.writerId.birthday)}
                    </StCommon.UserInfoSub>
                  </StCommon.FlexBetween>
                </Link>
              </StCommon.MyCard>
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
