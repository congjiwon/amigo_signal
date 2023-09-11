import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getSpotPost, updateSpotPost } from '../../../api/supabase/spotshare';
import { BtnStyleType } from '../../../types/styleTypes';
import useSessionStore from '../../../zustand/store';
import Button from '../../common/button/Button';
import { UpdateSpotCalendar } from '../../common/calendar/SpotCalendar';
import { UpdateLocationDropDown } from '../../common/dropDown/LocationDropDown';
import LoadingSpinner from '../../common/loadingSpinner/LoadingSpinner';
import { AlertError, AlertWarning } from '../../common/modal/alert';
import { UpdateStarRate } from '../../common/starRate/StarRate';
import SpotMap from '../map/SpotMap';
import SpotShareEditor from '../spotShareEditor/SpotShareEditor';
import * as St from './style';

export default function UpdateTemplate({ postId }: { postId: string }) {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const authId = window.localStorage.getItem('authId');
  const { data: spotSharePost, isLoading, isError } = useQuery(['spotSharePost', postId], () => getSpotPost({ postId }));
  const [title, setTitle] = useState<string>(spotSharePost?.title || '');
  const [editorHtml, setEditorHtml] = useState<string>('');
  const [location, setLocation] = useState<string[]>([]);
  const [spotDate, setSpotDate] = useState<string>('');
  const [star, setStar] = useState<number>(5);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>('');
  const [postImageUrl, setPostImageUrl] = useState<string[]>([]);
  const [like, setLike] = useState<number>(0);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authId) {
      navigate('/login');
    }
  }, [navigate, authId]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (spotSharePost) {
        setLocation([spotSharePost.region, spotSharePost.country.country]);
        setSpotDate(spotSharePost.visitDate);
        setStar(spotSharePost.starRate);
        setTitle(spotSharePost.title);
        setEditorHtml(spotSharePost.content);
        setLatitude(spotSharePost.latitude);
        setLongitude(spotSharePost.longitude);
        setAddress(spotSharePost.address);
        setPostImageUrl(spotSharePost.postImageUrl);
        setLike(spotSharePost.likeCount);
      }
    };
    fetchPostData();
  }, [spotSharePost]);

  const mutation = useMutation(updateSpotPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotSharePost']);
      navigate(`/spotshare/detail/${postId}`);
    },
    onError: () => {
      AlertError({});
      setDisable(false);
    },
  });

  const validation = (): boolean => {
    if (location.length < 1) {
      AlertWarning({ title: '국가를 선택해주세요.', position: 'top' });
      return false;
    } else if (spotDate.length < 1) {
      AlertWarning({ title: '방문날짜를 입력해주세요.', position: 'top' });
      return false;
    } else if (title.length < 1) {
      AlertWarning({ title: '제목을 입력해주세요.', position: 'top' });
      return false;
    } else {
      // html 태그 지우기
      const contentWithoutTags = editorHtml.replace(/<\/?[^>]+(>|$)/g, '');
      if (contentWithoutTags.length < 1) {
        AlertWarning({ title: '내용을 입력해주세요.', position: 'top' });
        return false;
      }
    }
    return true;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleOnSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateData = {
      id: postId,
      title,
      content: editorHtml,
      region: location[0],
      country: location[1],
      starRate: star,
      visitDate: spotDate,
      writerId: userId as string,
      latitude,
      longitude,
      address,
      postImageUrl,
      likeCount: like,
    };
    if (validation()) {
      setDisable(true);
      mutation.mutate(updateData);
    }
  };

  return (
    <St.FormContainer>
      <St.WriteForm onSubmit={handleOnSumbit}>
        <St.SelectListBox>
          <UpdateLocationDropDown location={[spotSharePost?.region!, spotSharePost?.country.country!]} setLocation={setLocation} />
          <UpdateSpotCalendar spotDate={spotSharePost?.visitDate!} setSpotDate={setSpotDate} />
          <UpdateStarRate star={spotSharePost?.starRate!} setStar={setStar} />
        </St.SelectListBox>
        <div>
          <St.SpotShareTitleInput maxLength={100} type="text" placeholder="제목을 입력해주세요" value={title || ''} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <SpotShareEditor editorHtml={editorHtml} setEditorHtml={setEditorHtml} postImageUrlArray={postImageUrl} setPostImageUrl={setPostImageUrl} />
        <SpotMap setLatitude={setLatitude} setLongitude={setLongitude} address={address} setAddress={setAddress} />
        <St.ButtonBox>
          <Button type="button" styleType={BtnStyleType.BTN_DARK} onClick={() => navigate('/spotshare')}>
            취소
          </Button>
          <Button type="submit" disabled={disable} styleType={BtnStyleType.BTN_DARK}>
            수정완료
          </Button>
        </St.ButtonBox>
      </St.WriteForm>
      {disable && <LoadingSpinner />}
    </St.FormContainer>
  );
}
