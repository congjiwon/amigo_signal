import { useEffect, useState } from 'react';
import { getPartnerPosts } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';
import PartnerItem from './PartnerItem';
import * as St from './style';
import TravelWith from '../../assets/imgs/partner/TravelWith.jpg';
import { useNavigate } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';

const PartnerList = () => {
  const [postStorage, setPostStorage] = useState<Tables<'partnerPosts'>[]>([]);
  const navigate = useNavigate();
  console.log('postStorage', postStorage);

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
  }, []);

  //무한스크롤
  const {
    data: data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPostData,
    getNextPageParam: (lastPage) => {
      console.log('getNextPageParam 호출');
      console.log('lastPage', lastPage);
      if (lastPage.page < lastPage.total_pages) {
        console.log('다음 페이지로 pageParam 저장');
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData.results).flat();
    },
  });

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
        <button onClick={() => navigate('/partner/write')}>글쓰기</button>
      </div>
      <St.Grid>
        {postStorage.map((post) => {
          return <PartnerItem key={post.id} post={post} />;
        })}
      </St.Grid>
    </>
  );
};

export default PartnerList;
