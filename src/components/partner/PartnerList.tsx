import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getFilteredPartnerPost } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';
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

  // 3중 필터 (나라, 기간, 모집여부)
  useEffect(() => {
    const getFilteredPost = async () => {
      const filteredPost = await getFilteredPartnerPost({ country: location[1], startDate: date[0], endDate: date[1], isOpen });
      if (filteredPost) {
        setPostStorage(filteredPost);
      }
    };
    //무한스크롤 옵저버 인식
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    getFilteredPost();
  }, [location, date, isOpen, pageLocation]);

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

  return (
    <St.PartnerListLayout>
      <St.FilterWriteBox>
        <div>
          <RecruitmentDropDown setIsOpen={setIsOpen} />
          <LocationDropDown setLocation={setLocation} />
          <PartnerCalendar setPartnerDates={setDate} />
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
    </St.PartnerListLayout>
  );
};

export default PartnerList;
