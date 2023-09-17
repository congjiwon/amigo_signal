import { QueryClient, useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { insertSpotPost } from '../../../api/supabase/spotshare';
import { removeQuillImg } from '../../../api/supabase/storage';
import useSessionStore from '../../../zustand/store';
import { SpotCalendar } from '../../common/calendar/SpotCalendar';
import { currentTime } from '../../common/currentTime/CurrentTime';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import LoadingSpinner from '../../common/loadingSpinner/LoadingSpinner';
import { AlertError, AlertWarning } from '../../common/modal/alert';
import StarRate from '../../common/starRate/StarRate';
import SpotMap from '../map/SpotMap';
import SpotShareEditor from '../spotShareEditor/SpotShareEditor';
import * as St from './style';

export default function WriteTemplate() {
  const queryClient = new QueryClient();
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const authId = window.localStorage.getItem('authId');
  const [title, setTitle] = useState<string>('');
  const [editorHtml, setEditorHtml] = useState<string>('');
  const [location, setLocation] = useState<string[]>([]);
  const [spotDate, setSpotDate] = useState<string>('');
  const [star, setStar] = useState<number>(5);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>('');
  const [postImageUrl, setPostImageUrl] = useState<string[]>([]);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authId) {
      navigate('/login');
    }
  }, [navigate, authId]);

  const mutation = useMutation(insertSpotPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotSharePost']);
      navigate('/spotshare');
    },
    onError: () => {
      AlertError({});
      setDisable(false);
    },
  });

  const validation = (): boolean => {
    if (location.length < 1) {
      AlertWarning({ title: '국가를 선택해주세요.' });
      return false;
    } else if (spotDate.length < 1) {
      AlertWarning({ title: '방문날짜를 입력해주세요.' });
      return false;
    } else if (title.length < 1 || title.trim() === '') {
      AlertWarning({ title: '제목을 입력해주세요.' });
      return false;
    } else {
      // html 태그 지우기
      const contentWithoutTags = editorHtml.replace(/<\/?[^>]+(>|$)/g, '');
      if (contentWithoutTags.length < 1 || contentWithoutTags.trim() === '') {
        AlertWarning({ title: '내용을 입력해주세요.' });
        return false;
      }
    }
    return true;
  };

  const handleOnSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nowData = currentTime();

    const newData = {
      createdAt: nowData,
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
      likeCount: 0,
    };
    if (validation()) {
      setDisable(true);
      mutation.mutate(newData);
    }
  };

  const handleonClickCancel = async () => {
    navigate('/spotshare');
    removeQuillImg({ removeImgArray: postImageUrl });
  };

  return (
    <St.FormContainer>
      <St.WriteForm onSubmit={handleOnSumbit}>
        <St.WriteBox>
          <St.SelectListBox>
            <LocationDropDown setLocation={setLocation} />
            <SpotCalendar setSpotDate={setSpotDate} />
            <StarRate setStar={setStar} />
          </St.SelectListBox>
          <div>
            <St.SpotShareTitleInput maxLength={100} type="text" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <SpotShareEditor editorHtml={editorHtml} setEditorHtml={setEditorHtml} postImageUrlArray={postImageUrl} setPostImageUrl={setPostImageUrl} />
        </St.WriteBox>
        <SpotMap setLatitude={setLatitude} setLongitude={setLongitude} address={address} setAddress={setAddress} country={location[1]} />
        <St.ButtonBox>
          <button className="CancelBtn" type="button" onClick={handleonClickCancel}>
            취소
          </button>
          <button className="SubmitBtn" type="submit" disabled={disable}>
            작성완료
          </button>
        </St.ButtonBox>
      </St.WriteForm>
      {disable && <LoadingSpinner />}
    </St.FormContainer>
  );
}
