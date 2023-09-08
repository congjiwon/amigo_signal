import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Rate } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FiEdit, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useNavigate, useParams } from 'react-router';
import { countLike, countLikes, deleteLike, deleteSpotSharePost, getDetailSpotSharePost, postLike } from '../../../api/supabase/spotshare';
import { supabase } from '../../../api/supabase/supabaseClient';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import useSessionStore from '../../../zustand/store';
import LoadingSpinner from '../../common/loadingSpinner/LoadingSpinner';
import { AlertError, ConfirmDelete } from '../../common/modal/alert';
import * as St from './style';

function SpotShareDetailContents() {
  const { postid } = useParams<string>();
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(0); // 이 부분을 추가
  let updateLikeCount = likeCount;
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  // 디테일 포스트 불러오기
  const { data: spotSharePost, isLoading, isError } = useQuery(['spotSharePost', postid], () => getDetailSpotSharePost(postid));

  // 좋아요 수 가져오기
  const { data: likeCountData } = useQuery(['likes', postid], () => countLikes(postid!));

  useEffect(() => {
    async function updateLikeCount() {
      const updatedCount = await countLikes(postid!);
      setLikeCount(updatedCount.count!);
    }

    updateLikeCount();
  }, [like, likeCountData]);

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
  }, [likeCount]);

  const mapRef = useRef<HTMLDivElement>(null);

  // 게시글 삭제
  const mutation = useMutation(deleteSpotSharePost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotSharePost']);
      navigate('/spotshare');
    },
    onError: () => {
      AlertError({});
    },
  });

  const deletePostHandle = async (id: string | undefined) => {
    const isConfirmed = await ConfirmDelete('해당 글이 삭제되었습니다.');
    if (!isConfirmed) {
      return;
    }
    mutation.mutate(id);
  };

  // 맵 불러오기
  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current) {
        const latitude = spotSharePost?.latitude;
        const longitude = spotSharePost?.longitude;

        if (latitude && longitude) {
          const location = { lat: latitude, lng: longitude };
          const map = new google.maps.Map(mapRef.current, {
            center: location,
            zoom: 17,
          });

          new google.maps.Marker({
            map: map,
            position: location,
          });
        }
      }
    };

    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
      initializeMap();
    } else {
      const googleMapScript = document.querySelector('script[src*="googleapis"]');
      googleMapScript?.addEventListener('load', initializeMap);
    }
  }, [spotSharePost]);

  if (isError) {
    return <div>Error loading data</div>;
  }

  // 글 작성자인지 확인하는 함수
  const isPostWriter = () => logInUserId == spotSharePost?.writerId;

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
    <>
      {isLoading && <LoadingSpinner />}
      <St.TitleBox>
        <p>{spotSharePost?.title}</p>
      </St.TitleBox>
      <div>
        <St.InfoOuterBox>
          <St.PostInfoBox>
            {spotSharePost?.users?.profileImageUrl ? <St.ProfileImage src={`${storagaUrl}/${spotSharePost.users.profileImageUrl}`} alt="profile" /> : <St.ProfileImage src={defaultProfileImage} alt="profile" />}
            <St.InfoInnerBox>
              <St.NickNameSpan style={{ paddingTop: '1px', paddingBottom: '5px' }}>{spotSharePost?.users?.nickName} </St.NickNameSpan>
              <St.InfoContainer>
                <span>{spotSharePost?.createdAt.substring(0, 10) + ' ' + spotSharePost?.createdAt.substring(11, 16)} </span>
                <span>조회 100</span>
                <span>좋아요 {likeCount}</span>
              </St.InfoContainer>
            </St.InfoInnerBox>
          </St.PostInfoBox>
          <St.ButtonBox>
            {logInUserId && <button>{like ? <RiHeartFill onClick={() => handleEmptyHeart()} style={St.Heart} /> : <RiHeartLine onClick={() => handleFillHeart()} style={St.Heart} />}</button>}
            {isPostWriter() ? (
              <>
                <button>{<FiEdit onClick={() => navigate(`/spotshare/write/${spotSharePost?.id}`)} style={{ height: '24px', width: '24px' }} />}</button>
                <button>{<FiTrash2 onClick={() => deletePostHandle(spotSharePost?.id)} style={{ height: '24px', width: '24px' }} />}</button>
              </>
            ) : (
              ''
            )}
          </St.ButtonBox>
        </St.InfoOuterBox>
      </div>

      <St.SpotShareBox>
        <div>
          <St.DetailInfoBox>
            <St.GraySpan>나라 </St.GraySpan>
            <St.BlackSpan>
              {spotSharePost?.region} &gt; {spotSharePost?.country.country}
            </St.BlackSpan>
          </St.DetailInfoBox>
          <St.DetailInfoBox>
            <St.GraySpan>방문날짜</St.GraySpan>
            <St.BlackSpan> {spotSharePost?.visitDate}</St.BlackSpan>
          </St.DetailInfoBox>
          <St.DetailInfoBox>
            <Rate disabled defaultValue={spotSharePost?.starRate} />
          </St.DetailInfoBox>
        </div>

        <ReactQuill readOnly={true} theme="bubble" value={spotSharePost?.content} />
      </St.SpotShareBox>
      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        {spotSharePost?.address ? (
          <p style={{ marginBottom: '10px' }}>
            <FiMapPin style={{ marginRight: '10px' }} />
            {spotSharePost?.address}
          </p>
        ) : (
          <></>
        )}
        {spotSharePost?.latitude && spotSharePost.longitude ? <div ref={mapRef} style={{ width: '100%', height: '50vh' }} /> : <></>}
      </div>
    </>
  );
}

export default SpotShareDetailContents;
