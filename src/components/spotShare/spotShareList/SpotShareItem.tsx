import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { countLike, deleteLike, postLike } from '../../../api/supabase/spotshare';
import { Tables } from '../../../api/supabase/supabase';
import Calendar from '../../../assets/imgs/partner/Calendar.svg';
import useSessionStore from '../../../zustand/store';
import * as St from './style';

type SpotItemProps = {
  post: Tables<'spotPosts'>;
  likedPost?: {
    id: string;
    postId: {
      address: string | null;
      content: string;
      country: {
        country: string;
        countryId: string;
        flagUrl: string;
        id: number;
        imageUrl: string;
      };
      createdAt: string;
      id: string;
      latitude: number | null;
      longitude: number | null;
      postImageUrl: string[] | null;
      region: string;
      starRate: number;
      title: string;
      visitDate: string;
      writerId: string;
    };
    userId: string;
  }[];
};

function SpotShareItem({ post, likedPost }: SpotItemProps) {
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const LikeCheck = async (logInUserId: string) => {
    const liked = likedPost?.some((like) => like.postId.id === post.id && like.userId === logInUserId);

    if (liked) {
      setLike(liked!);
    } else if (liked === false) {
      setLike(false);
    }
  };
  useEffect(() => {
    LikeCheck(logInUserId!);
  }, [likedPost]);

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
  const handleFillHeart = _.debounce(async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (logInUserId === undefined) {
      navigate('/login');
    }

    await queryClient.invalidateQueries(['likes', post.id]);
    setLike(!like);
    const addLike = { postId: post.id!, userId: logInUserId! };
    await postLike(addLike);
    await countLike(++post.likeCount, post.id!);
  }, 300);

  const handleEmptyHeart = _.debounce(async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    await queryClient.invalidateQueries(['likes', post.id]);
    setLike(!like);
    await deleteLike(post.id!, logInUserId!);
    await countLike(--post.likeCount, post.id!);
  }, 300);

  return (
    <div>
      <Link to={`detail/${post.id}`}>
        <St.PostCard>
          <St.DateLikeBox>
            <St.TravelDateBox>
              <St.CalendarImage src={Calendar} alt="방문날짜" />
              <p>
                {visitDate[0]}년 {visitDate[1]}월 {visitDate[2]}일
              </p>
            </St.TravelDateBox>
          </St.DateLikeBox>
          <St.TitleBox>
            <p>{post.title}</p>
          </St.TitleBox>
          <St.ContentBox>
            <p>{contentWithoutTags}</p>
          </St.ContentBox>
          <St.DefaultImg src={post.country.imageUrl}></St.DefaultImg>
          <St.Span>{post.country.country}</St.Span>
        </St.PostCard>
      </Link>

      <St.LikeBox>
        <St.LikeButton>{like ? <RiHeartFill onClick={(event) => handleEmptyHeart(event)} style={St.Heart} /> : <RiHeartLine onClick={(event) => handleFillHeart(event)} style={St.Heart} />}</St.LikeButton>
      </St.LikeBox>
    </div>
  );
}

export default SpotShareItem;
