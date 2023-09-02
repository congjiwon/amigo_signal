import { useEffect, useRef, useState } from 'react';
import { getAllSpotSharePost, getFilteredSpotSharePost } from '../../../api/supabase/spotshare';
import { Tables } from '../../../api/supabase/supabase';
import { supabase } from '../../../api/supabase/supabaseClient';
import { FilterSpotCalendar } from '../../common/calendar/SpotCalendar';
import { useLocation, useNavigate } from 'react-router';
import { SortDropDown } from '../../common/dropDown/DropDown';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import TopButton from '../../common/topbutton/TopButton';
import SpotShareItem from './SpotShareItem';
import * as St from './style';
import { Skeleton } from 'antd';

const SpotShareList = () => {
  const [postStorage, setPostStorage] = useState<Tables<'spotPosts'>[]>([]);
  const [sort, setSort] = useState<string>('최신순');
  const divRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(true);
  const offset = (currentPage - 1) * limit;
  const [location, setLocation] = useState<string[]>([]);
  const [spotDate, setSpotDate] = useState<string[]>([]);
  const pageLocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { data, error } = await getAllSpotSharePost();
      if (error || !data) {
        console.error('스팟공유 게시글 목록을 가져오는 과정에서 에러 발생', error);
        setPostStorage([]);
      } else {
        // data.sort((a, b) => {
        //   return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        // });
        setPostStorage(data);
      }
      setIsLoading(false);
    };
    fetchPosts();

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

  // 필터링
  useEffect(() => {
    const getfilteredPost = async () => {
      const filteredPost = await getFilteredSpotSharePost({ country: location[1], startDate: spotDate[0], endDate: spotDate[1] });
      if (filteredPost) {
        setPostStorage(filteredPost);
      } else {
        setPostStorage([]);
      }
    };
    getfilteredPost();
  }, [location, spotDate]);

  const handleSortChange = async (value: string) => {
    setSort(value);

    if (value === '최신순') {
      try {
        const { data: sharePosts, error } = await supabase.from('spotPosts').select('*, users!spotPosts_writerId_fkey(*)').order('createdAt', { ascending: false });
        if (error) {
          console.log('스팟 최신순 정렬 실패', error);
        } else {
          setPostStorage(sharePosts);
        }
      } catch (error) {
        console.log('이 에러는 또 뭐지', error);
      }
    } else {
      try {
        const { data: sharePosts, error } = await supabase.from('spotPosts').select('*, users!spotPosts_writerId_fkey(*)').order('likeCount', { ascending: false });
        if (error) {
          console.log('스팟 인기순 정렬 실패', error);
        } else {
          setPostStorage(sharePosts);
        }
      } catch (error) {
        console.log('이 에러는 또 뭐지', error);
      }
    }
  };

  return (
    <>
      <St.filterBox>
        <div>
          <SortDropDown setSort={handleSortChange} />
          <LocationDropDown setLocation={setLocation} />
          <FilterSpotCalendar setSpotDate={setSpotDate} />
        </div>
        <button onClick={() => navigate('/spotshare/write')}>글쓰기</button>
      </St.filterBox>
      {isLoading ? ( // 로딩 중일 때 로딩 화면 표시
        // <div>Loading...</div>
        <Skeleton active />
      ) : (
        <St.Grid>
          {postStorage
            .map((post) => {
              return <SpotShareItem key={post.id} post={post} />;
            })
            .slice(0, offset + 10)}
          <div ref={divRef}></div>
          <St.MoveButtonArea>
            <TopButton />
          </St.MoveButtonArea>
        </St.Grid>
      )}
    </>
  );
};

export default SpotShareList;
