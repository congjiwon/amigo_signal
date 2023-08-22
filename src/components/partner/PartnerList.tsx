import { useEffect, useState } from 'react';
import * as St from './style';
import PartnerItem from './PartnerItem';
import { getPartnerPosts } from '../../api/supabase/partner';
import { Tables } from '../../api/supabase/supabase';

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
      <St.Grid>
        {postStorage.map((post) => {
          return <PartnerItem key={post.id} post={post} />;
        })}
      </St.Grid>
    </>
  );
};

export default PartnerList;
