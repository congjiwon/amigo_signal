import React, { useEffect, useRef, useState } from 'react';
import * as St from './style';
import { getSpotSharePost } from '../../../api/supabase/spotshare';
import { Tables } from '../../../api/supabase/supabase';
import SpotShareItem from './SpotShareItem';

const SpotShareList = () => {
  const [postStorage, setPostStorage] = useState<Tables<'spotPosts'>[]>([]);
  const divRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await getSpotSharePost();
      if (error || !data) {
        console.error('스팟공유 게시글 목록을 가져오는 과정에서 에러 발생', error);
        setPostStorage([]);
      } else {
        data.sort((a, b) => {
          return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        });
        setPostStorage(data);
        console.log(data);
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
  return (
    <St.Grid>
      {postStorage
        .map((post) => {
          return <SpotShareItem key={post.id} post={post} />;
        })
        .slice(0, offset + 10)}
      <div ref={divRef}></div>
    </St.Grid>
  );
};

export default SpotShareList;
