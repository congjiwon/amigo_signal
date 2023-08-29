import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSpotShareDefaultImg } from '../../../api/supabase/spotshare';
import { Tables } from '../../../api/supabase/supabase';
import Calendar from '../../../assets/imgs/partner/Calendar.svg';
import * as St from './style';

type SpotItemProps = {
  post: Tables<'spotPosts'>;
};

function SpotShareItem({ post }: SpotItemProps) {
  const [countryImg, setCountryImg] = useState<string>('');
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

  // console.log('durl', countryImg);
  return (
    <Link to={`detail/${post.id}`}>
      <St.PostCard>
        <St.TravelDateBox>
          <img style={{ paddingLeft: '21px' }} src={Calendar} alt="방문날짜" />
          <p>{post.visitDate}</p>
        </St.TravelDateBox>
        <St.TitleBox>
          <h1>{post.title}</h1>
        </St.TitleBox>
        <St.ContentBox>
          <p>{post.content}</p>
        </St.ContentBox>
        <div>
          <img src="countryImg" style={{ width: '100px', height: '100px' }}></img>
        </div>
        <St.Span>{post.country}</St.Span>
      </St.PostCard>
    </Link>
  );
}

export default SpotShareItem;
