import { useEffect, useState, useRef } from 'react';
import { getFilteredPartnerPost, getPartnerPosts } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';
import PartnerItem from './PartnerItem';
import * as St from './style';
import TravelWith from '../../assets/imgs/partner/TravelWith.jpg';
import { useNavigate } from 'react-router';
import LocationDropDown from '../common/dropDown/LocationDropDown';
import PartnerCalendar from '../common/calendar/PartnerCalendar';
import TopButton from '../common/topbutton/TopButton';

interface passType {
  country?: string;
  startDate?: string;
  endDate?: string;
}

const PartnerList = () => {
  const [postStorage, setPostStorage] = useState<Tables<'partnerPosts'>[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);

  const navigate = useNavigate();
  const divRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await getPartnerPosts();
      if (error || !data) {
        console.error('동행자 게시글 목록을 가져오는 과정에서 에러 발생', error);
        setPostStorage([]);
      } else {
        data.sort((a, b) => {
          return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        });
        setPostStorage(data);
      }
    };
    fetchPosts();

    //무한스크롤 옵저버 인식
    if (divRef.current) {
      observer.observe(divRef.current);
    }
  }, []);

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

  //나라 필터
  useEffect(() => {
    const getfilteredPost = async () => {
      console.log(location[1], date[0], date[1]);
      const filteredPost = await getFilteredPartnerPost({ country: location[1], startDate: date[0], endDate: date[1] });
      if (filteredPost) {
        console.log('sdfsdfs', filteredPost);
        setPostStorage(filteredPost);
      }
    };
    getfilteredPost();
  }, [location, date]);

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
      <div>
        <LocationDropDown setLocation={setLocation} />
        <PartnerCalendar setPartnerDates={setDate} />
      </div>
      <div>
        <button onClick={() => navigate('/partner/write')}>글쓰기</button>
      </div>
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
