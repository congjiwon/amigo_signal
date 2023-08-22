import { useEffect, useState } from 'react';
import { getPartnerPosts } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';
import PartnerItem from './PartnerItem';
import * as St from './style';
import TravelWith from '../../assets/TravelWith.jpg';

const PartnerList = () => {
  const [postStorage, setPostStorage] = useState<Tables<'partnerPosts'>[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await getPartnerPosts();
      if (error || !data) {
        console.error('동행자 게시글 목록을 가져오는 과정에서 에러 발생', error);
        setPostStorage([]);
      } else {
        setPostStorage(data);
      }
    };
    fetchPosts();
  }, []);

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
      <St.Grid>
        {postStorage.map((post) => {
          return <PartnerItem key={post.id} post={post} />;
        })}
      </St.Grid>
    </>
  );
};

export default PartnerList;
