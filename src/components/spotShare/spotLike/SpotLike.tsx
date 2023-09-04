import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { useParams } from 'react-router';
import { countLike, deleteLike, postLike } from '../../../api/supabase/spotshare';
import { supabase } from '../../../api/supabase/supabaseClient';
import useSessionStore from '../../../zustand/store';

function SpotLike() {
  const { postid } = useParams<string>();
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(0); // 이 부분을 추가
  let updateLikeCount = likeCount;

  // 좋아요
  const LikeCheck = async (logInUserId: string, postid: string) => {
    try {
      let { data: likeData, error } = await supabase.from('likes').select('*').eq('userId', logInUserId).eq('postId', postid);

      if (error) {
        console.log('좋아요 가져오기 처참히 실패', error);
      } else {
        setLike(likeData!.length > 0);
      }
    } catch (error) {
      console.log('처참히 실패 개웃겨', error);
    }
  };
  useEffect(() => {
    LikeCheck(logInUserId!, postid!);
  }, [logInUserId!, postid!]);

  // 좋아요 클릭 시
  const handleFillHeart = async () => {
    setLike(!like);
    const addLike = { postId: postid!, userId: logInUserId! };
    await postLike(addLike);
    await countLike(updateLikeCount++, postid!);
    await queryClient.invalidateQueries(['likes', postid]);
  };

  const handleEmptyHeart = async () => {
    setLike(!like);
    await deleteLike(postid!, logInUserId!);
    await countLike(updateLikeCount++, postid!);
    await queryClient.invalidateQueries(['likes', postid]);
  };

  return <>{logInUserId && <button>{like ? <RiHeartFill onClick={() => handleEmptyHeart()} style={{ height: '22px', width: '22px' }} /> : <RiHeartLine onClick={() => handleFillHeart()} style={{ height: '22px', width: '22px' }} />}</button>}</>;
}

export default SpotLike;
