import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { countLike, deleteLike, getSpotShareDefaultImg, postLike } from '../../../api/supabase/spotshare';
import { Tables } from '../../../api/supabase/supabase';
import { supabase } from '../../../api/supabase/supabaseClient';
import Calendar from '../../../assets/imgs/partner/Calendar.svg';
import useSessionStore from '../../../zustand/store';
import * as St from './style';

type SpotItemProps = {
  post: Tables<'spotPosts'>;
  liked: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

function SpotShareItem({ post, liked }: SpotItemProps) {
  const [countryImg, setCountryImg] = useState<string>('');
  const { postid } = useParams<string>();
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(0); // 이 부분을 추가
  let updateLikeCount = likeCount;

  //국가 디폴트 이미지 넣기
  useEffect(() => {
    const getDefaultImgHandler = async () => {
      const { data, error } = await getSpotShareDefaultImg(post.country);
      if (error || !data) {
        console.error('디폴트이미지 가져오는 과정에서 에러 발생', error);
      } else {
        setCountryImg(data[0].imageUrl);
      }
    };
    getDefaultImgHandler();
  }, []);

  // 좋아요
  const LikeCheck = async (logInUserId: string, postid: string) => {
    try {
      let { data: likeData, error } = await supabase.from('likes').select('*').eq('userId', logInUserId).eq('postId', postid);

      if (error) {
        // console.log('좋아요 가져오기 처참히 실패', error);
      } else {
        setLike(likeData!.length > 0);
      }
    } catch (error) {
      console.log('처참히 실패 개웃겨', error);
    }
  };
  useEffect(() => {
    LikeCheck(logInUserId!, postid!);
  }, [like]);
  // }, [logInUserId!, postid!]);

  //방문날짜 2023-05-05 => 2023년 5월 5일 바꾸는 로직
  const visitDate = post.visitDate.split('-');
  if (visitDate[1][0] == '0') {
    visitDate[1] = visitDate[1].substring(1);
  }
  if (visitDate[2][0] == '0') {
    visitDate[2] = visitDate[2].substring(1);
  }

  const contentWithoutTags = post.content.replace(/<\/?[^>]+(>|$)/g, '');

  // 좋아요 클릭 시
  const handleFillHeart = async () => {
    setLike(!like);
    const addLike = { postId: postid!, userId: logInUserId! };
    await postLike(addLike);
    await countLike(++updateLikeCount, postid!);
    await queryClient.invalidateQueries(['likes', postid]);
  };

  const handleEmptyHeart = async () => {
    setLike(!like);
    await deleteLike(postid!, logInUserId!);
    await countLike(--updateLikeCount, postid!);
    await queryClient.invalidateQueries(['likes', postid]);
  };

  return (
    // <Link to={`detail/${post.id}`}>
    <St.PostCard>
      <St.TravelDateBox>
        <img style={{ paddingLeft: '21px' }} src={Calendar} alt="방문날짜" />
        <p>
          {visitDate[0]}년 {visitDate[1]}월 {visitDate[2]}일
        </p>
      </St.TravelDateBox>
      <div>
        {logInUserId && <button>{liked && like ? <RiHeartFill onClick={() => handleEmptyHeart()} style={{ height: '22px', width: '22px' }} /> : <RiHeartLine onClick={() => handleFillHeart()} style={{ height: '22px', width: '22px' }} />}</button>}
      </div>
      <St.TitleBox>
        <Link to={`detail/${post.id}`}>{post.title}</Link>
      </St.TitleBox>
      <St.ContentBox>
        <p>{contentWithoutTags}</p>
      </St.ContentBox>
      <DefaultImg src={countryImg}></DefaultImg>
      <St.Span>{post.country}</St.Span>
    </St.PostCard>
    // </Link>
  );
}

export default SpotShareItem;

const DefaultImg = styled.img`
  width: 282px;
  height: 143px;
  object-fit: cover;

  border-radius: 0px 0px 30px 30px;
`;
