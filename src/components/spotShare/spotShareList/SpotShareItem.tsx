import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { countLike, deleteLike, postLike } from '../../../api/supabase/spotshare';
import { Tables } from '../../../api/supabase/supabase';
import Calendar from '../../../assets/imgs/partner/Calendar.svg';
import useSessionStore from '../../../zustand/store';
import * as St from './style';

type SpotItemProps = {
  post: Tables<'spotPosts'>;
  countryData: {
    country: string;
    countryId: string;
    flagUrl: string;
    id: number;
    imageUrl: string;
  };
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

function SpotShareItem({ post, likedPost, countryData }: SpotItemProps) {
  const [countryImg, setCountryImg] = useState<string>('');
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(0); // 이 부분을 추가
  let updateLikeCount = post.likeCount;

  // // 국가 디폴트 이미지 넣기
  // useEffect(() => {
  //   const getDefaultImgHandler = async () => {
  //     const { data, error } = await getSpotShareDefaultImg(post.country.country);
  //     if (error || !data) {
  //       console.error('디폴트이미지 가져오는 과정에서 에러 발생', error);
  //     } else {
  //       setCountryImg(data[0].imageUrl);
  //     }
  //   };
  //   getDefaultImgHandler();
  // }, []);

  // 좋아요
  const LikeCheck = async (logInUserId: string) => {
    const liked = likedPost?.some((like) => like.postId.id === post.id && like.userId === logInUserId);
    console.log('이게뭐야', liked);
    if (liked) {
      setLike(liked!);
    }
  };
  useEffect(() => {
    LikeCheck(logInUserId!);
    // }, [likedPost]);
  }, [logInUserId!, post.id!, like]);

  //방문날짜 2023-05-05 => 2023년 5월 5일 바꾸는 로직
  const visitDate = post.visitDate.split('-');
  if (visitDate[1][0] == '0') {
    visitDate[1] = visitDate[1].substring(1);
  }
  if (visitDate[2][0] == '0') {
    visitDate[2] = visitDate[2].substring(1);
  }
  console.log('countryImg', countryImg);
  const contentWithoutTags = post.content.replace(/<\/?[^>]+(>|$)/g, '');

  // 좋아요 클릭 시
  const handleFillHeart = async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    await queryClient.invalidateQueries(['likes', post.id]);
    setLike(!like);
    const addLike = { postId: post.id!, userId: logInUserId! };
    await postLike(addLike);
    await countLike(++post.likeCount, post.id!);
  };

  const handleEmptyHeart = async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    setLike(!like);
    await deleteLike(post.id!, logInUserId!);
    await countLike(--post.likeCount, post.id!);
    await queryClient.invalidateQueries(['likes', post.id]);
  };

  console.log('zzz', post.country.imageUrl);

  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.DateLikeBox>
          <St.TravelDateBox>
            <St.CalendarImage src={Calendar} alt="방문날짜" />
            <p>
              {visitDate[0]}년 {visitDate[1]}월 {visitDate[2]}일
            </p>
          </St.TravelDateBox>
          {logInUserId ? (
            <div>
              <St.LikeButton>
                {like ? <RiHeartFill onClick={(event) => handleEmptyHeart(event)} style={{ height: '24px', width: '24px' }} /> : <RiHeartLine onClick={(event) => handleFillHeart(event)} style={{ height: '24px', width: '22px' }} />}
              </St.LikeButton>
            </div>
          ) : (
            ''
          )}
        </St.DateLikeBox>
        <St.TitleBox>
          <h1>{post.title}</h1>
        </St.TitleBox>
        <St.ContentBox>
          <p>{contentWithoutTags}</p>
        </St.ContentBox>
        <St.DefaultImg src={countryData.imageUrl}></St.DefaultImg>
        <St.Span>{countryData.country}</St.Span>
      </St.PostCard>
    </Link>
  );
}

export default SpotShareItem;
