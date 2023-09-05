import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getFilteredPartnerPost, getPartnerPosts } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';
import TravelWith from '../../assets/imgs/partner/TravelWith.jpg';
import SkeletonBanner from '../common/Skeleton/SkeletonBanner';
import SkeletonList from '../common/Skeleton/SkeletonList';
import PartnerCalendar from '../common/calendar/PartnerCalendar';
import { RecruitmentDropDown } from '../common/dropDown/DropDown';
import LocationDropDown from '../common/dropDown/LocationDropDown';
import TopButton from '../common/topbutton/TopButton';
import PartnerItem from './PartnerItem';
import * as St from './style';

const PartnerList = () => {
  const [postStorage, setPostStorage] = useState<Tables<'partnerPosts'>[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>();
  const navigate = useNavigate();
  const divRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const pageLocation = useLocation();

  const { data, isLoading } = useQuery(['PartnerPostsList'], () => getPartnerPosts());

  useEffect(() => {
    if (data && data.data) setPostStorage(data.data);
  }, []);

  useEffect(() => {
    //무한스크롤 옵저버 인식
    if (divRef.current) {
      observer.observe(divRef.current);
    }
  }, [pageLocation]);

  const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px',
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setCurrentPage((prevPage) => prevPage + 1);
        }, 500);
      }
    },
    {
      ...defaultOption,
    },
  );

  // 3중 필터 (나라, 기간, 모집여부)
  useEffect(() => {
    const getFilteredPost = async () => {
      const filteredPost = await getFilteredPartnerPost({ country: location[1], startDate: date[0], endDate: date[1], isOpen });
      if (filteredPost) {
        setPostStorage(filteredPost);
      }
    };
    getFilteredPost();
  }, [location, date, isOpen]);

  if (isLoading) {
    return (
      <>
        <St.ImageWrapper>
          <SkeletonBanner />
        </St.ImageWrapper>
        <SkeletonList />
      </>
    );
  }

  return (
    <>
      <St.ImageWrapper>
        <St.MainImage src={TravelWith} alt="mainImage" />
        <St.ImageMainText>친구와 함께라면 더 즐겁지 않을까요?</St.ImageMainText>
        <St.ImageSubText>
          Amigo Signal과 함께 여행에 동행할 친구를 찾아보세요.
          <br />
          여행이 더 즐거워질 거에요.
        </St.ImageSubText>
      </St.ImageWrapper>
      <St.FilterWriteBox>
        <div>
          <LocationDropDown setLocation={setLocation} />
          <PartnerCalendar setPartnerDates={setDate} />
          <RecruitmentDropDown setIsOpen={setIsOpen} />
        </div>
        <button onClick={() => navigate('/partner/write')}>글쓰기</button>
      </St.FilterWriteBox>

      <St.Grid>
        {postStorage
          .map((post) => {
            return <PartnerItem key={post.id} post={post} />;
          })
          .slice(0, offset + 10)}
        <div ref={divRef}></div>
        <St.MoveButtonArea>
          <TopButton />
        </St.MoveButtonArea>
      </St.Grid>
    </>
  );
};

export default PartnerList;
