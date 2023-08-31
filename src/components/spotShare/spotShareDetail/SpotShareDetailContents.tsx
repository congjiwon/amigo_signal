import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useNavigate, useParams } from 'react-router';
import { styled } from 'styled-components';
import { countLikes, deleteLike, deleteSpotSharePost, getDetailSpotSharePost, postLike } from '../../../api/supabase/spotshare';
import { supabase } from '../../../api/supabase/supabaseClient';
import useSessionStore from '../../../zustand/store';
import { ConfirmDelete } from '../../common/modal/alert';

type postIdProps = {
  postId: string | undefined;
};

function SpotShareDetailContents() {
  const { postid } = useParams<string>();
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(0); // 이 부분을 추가

  // 디테일 포스트 불러오기
  const { data: spotSharePost, isLoading, isError } = useQuery(['spotSharePost', postid], () => getDetailSpotSharePost(postid));

  // 좋아요 수 가져오기
  const { data: likeCountData } = useQuery(['likes', postid], () => countLikes(postid!));
  console.log('likeData', likeCountData?.count);

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
  }, [logInUserId!, postid!]);

  const mapRef = useRef<HTMLDivElement>(null);

  // 게시글 삭제
  const mutation = useMutation(deleteSpotSharePost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotSharePost']);
    },
  });

  const deletePostHandle = async (id: string | undefined) => {
    const isConfirmed = await ConfirmDelete('해당 글이 삭제되었습니다.');
    if (!isConfirmed) {
      return;
    }
    mutation.mutate(id);
    navigate('/spotshare');
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
    await queryClient.invalidateQueries(['likes', postid]);
  };

  const handleEmptyHeart = async () => {
    setLike(!like);
    await deleteLike(postid!, logInUserId!);
    await queryClient.invalidateQueries(['likes', postid]);
  };

  return (
    <>
      <TitleBox>
        <p>제목: {spotSharePost?.title}</p>
      </TitleBox>
      <InfoBox>
        <span>{spotSharePost?.region}</span>
        <span>{spotSharePost?.country}</span>
        <span>방문날짜: {spotSharePost?.visitDate}</span>
        <span>{spotSharePost?.starRate}</span>
      </InfoBox>
      <SpotShareBox>
        <ButtonBox>
          {logInUserId && <span>{like ? <RiHeartFill onClick={() => handleEmptyHeart()} style={{ height: '22px', width: '22px' }} /> : <RiHeartLine onClick={() => handleFillHeart()} style={{ height: '22px', width: '22px' }} />}</span>}
          {isPostWriter() ? (
            <>
              <span>{<FiEdit onClick={() => navigate(`/spotshare/write/${spotSharePost?.id}`)} style={{ height: '22px', width: '22px' }} />}</span>
              <span>{<FiTrash2 onClick={() => deletePostHandle(spotSharePost?.id)} style={{ height: '22px', width: '22px' }} />}</span>
            </>
          ) : (
            ''
          )}
        </ButtonBox>
        <ReactQuill readOnly={true} theme="bubble" value={spotSharePost?.content} />
        <WriterInfoBox>
          <span>작성자: {spotSharePost?.users.nickName} </span>
          <span>작성시간: {spotSharePost?.createdAt.substring(0, 10) + ' ' + spotSharePost?.createdAt.substring(11, 16)} </span>
          <span>좋아요 수: {likeCount}</span>
        </WriterInfoBox>
      </SpotShareBox>
      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        {spotSharePost?.address ? <p style={{ marginBottom: '10px' }}>주소: {spotSharePost?.address}</p> : <></>}
        {spotSharePost?.latitude && spotSharePost.longitude ? <div ref={mapRef} style={{ width: '100%', height: '50vh' }} /> : <></>}
      </div>
    </>
  );
}

export default SpotShareDetailContents;
const WriterInfoBox = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  text-align: right;
  margin: 0px 47px 47px 0px;
  span {
    font-size: 13px;
    margin-left: 10px;
  }
`;

const ButtonBox = styled.div`
  margin: 33px 33px 0px 0px;
  text-align: right;
  span {
    margin-left: 11px;
  }
`;

const TitleBox = styled.div`
  border: 2px solid #efefef;
  border-radius: 50px;
  margin-bottom: 29px;
  height: 51px;
  p {
    font-size: 18px;
    margin: 19px 0 12px 57px;
  }
`;

const InfoBox = styled.div`
  height: 51px;
  span {
    margin-right: 20px;
    border: 2px solid #efefef;
    border-radius: 50px;
    padding: 11px 35px;
  }
`;

export const SpotShareBox = styled.div`
  & strong {
    font-weight: 700;
  }

  & em {
    font-style: italic;
  }
  border: 2px solid #efefef;
  border-radius: 10px;
  padding-left: 37px;
  padding-bottom: 130px;
  position: relative;
`;
