import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Rate } from 'antd';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { FiEdit, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useNavigate, useParams } from 'react-router';
import { countLike, countLikes, deleteLike, deleteSpotSharePost, getDetailSpotSharePost, getLikesCondition, postLike } from '../../../api/supabase/spotshare';
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

  const { data: likeCountData } = useQuery(['likes', postid], () => countLikes(postid!));

  useEffect(() => {
    async function updateLikeCount() {
      const updatedCount = await countLikes(postid!);
      setLikeCount(updatedCount.count!);
    }

    updateLikeCount();
  }, [like, likeCountData]);

  // 좋아요 상태 가져오기
  const LikeCheck = async (logInUserId: string, postid: string) => {
    const data = await getLikesCondition(logInUserId, postid);
    setLike(data! && data!.length > 0);
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
      if (spotSharePost) {
        const { data } = await supabase.storage.from('quillImgs').remove(spotSharePost.postImageUrl);
      }
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
    navigate('notfound');
  }

  // 글 작성자인지 확인하는 함수
  const isPostWriter = () => logInUserId == spotSharePost?.writerId;

  const debouncedAddLikeHandle = _.debounce(() => {
    if (logInUserId === undefined) {
      navigate('/login');
    }
    const handleFillHeart = async () => {
      setLike(!like);
      await postLike({ postId: postid!, userId: logInUserId! });
      await countLike(++updateLikeCount, postid!);
      await queryClient.invalidateQueries(['likes', postid]);
    };

    handleFillHeart();
  }, 300);

  const debouncedRemoveLikeHandle = _.debounce(() => {
    const handleEmptyHeart = async () => {
      setLike(!like);
      await deleteLike(postid!, logInUserId!);
      await countLike(--updateLikeCount, postid!);
      await queryClient.invalidateQueries(['likes', postid]);
    };

    handleEmptyHeart();
  }, 300);
  return (
    <>
      <St.DetailSection>
        {isLoading && <LoadingSpinner />}
        <St.TitleBox>
          <p>{spotSharePost?.title}</p>
        </St.TitleBox>
        <St.InfoOuterBox>
          <St.PostInfoBox>
            {spotSharePost?.users?.profileImageUrl ? <St.ProfileImage src={`${storagaUrl}/${spotSharePost.users.profileImageUrl}`} alt="profile" /> : <St.ProfileImage src={defaultProfileImage} alt="profile" />}
            <div>
              <St.NickNameSpan>{spotSharePost?.users?.nickName} </St.NickNameSpan>
              <St.InfoContainer>
                <span>{spotSharePost?.createdAt.substring(0, 10) + ' ' + spotSharePost?.createdAt.substring(11, 16)} </span>
                <span>좋아요 {likeCount}</span>
              </St.InfoContainer>
            </div>
          </St.PostInfoBox>
          <St.ButtonBox>
            <button>{like ? <RiHeartFill className="fillIcon" onClick={() => debouncedRemoveLikeHandle()} /> : <RiHeartLine className="lineIcon" onClick={() => debouncedAddLikeHandle()} />}</button>
            {isPostWriter() ? (
              <>
                <button>{<FiEdit className="lineIcon" onClick={() => navigate(`/spotshare/write/${spotSharePost?.id}`)} />}</button>
                <button>{<FiTrash2 className="lineIcon" onClick={() => deletePostHandle(spotSharePost?.id)} />}</button>
              </>
            ) : (
              ''
            )}
          </St.ButtonBox>
        </St.InfoOuterBox>

        <St.DetailInfoList>
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
          <St.DetailInfoBox>{spotSharePost?.starRate && <Rate style={{ color: '#643bdc' }} disabled defaultValue={spotSharePost.starRate} />}</St.DetailInfoBox>
        </St.DetailInfoList>

        <St.SpotShareBox>
          <ReactQuill readOnly={true} theme="bubble" value={spotSharePost?.content} />
        </St.SpotShareBox>
      </St.DetailSection>
      <St.MapSection>
        {spotSharePost?.address ? (
          <St.AddressBox>
            <FiMapPin className="markerIcon" />
            <span>{spotSharePost?.address}</span>
          </St.AddressBox>
        ) : (
          <></>
        )}
        {spotSharePost?.latitude && spotSharePost.longitude ? <div ref={mapRef} style={{ width: '100%', height: '50vh' }} /> : <></>}
      </St.MapSection>
    </>
  );
}

export default SpotShareDetailContents;
