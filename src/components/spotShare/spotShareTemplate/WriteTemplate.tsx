import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { insertSpotPost } from '../../../api/supabase/spotshare';
import { BtnStyleType } from '../../../types/styleTypes';
import useSessionStore from '../../../zustand/store';
import Button from '../../common/button/Button';
import { SpotCalendar } from '../../common/calendar/SpotCalendar';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import { AlertError, AlertWarning } from '../../common/modal/alert';
import StarRate from '../../common/starRate/StarRate';
import SpotMap from '../map/SpotMap';
import SpotShareEditor from '../spotShareEditor/SpotShareEditor';
import * as St from './style';

export default function WriteTemplate() {
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!authId) {
      navigate('/login');
    }
  }, [navigate, authId]);

  const currentTime = function () {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
    const now = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return now;
  };

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

  const handleOnSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      likeCount: 0,
    };
    if (validation()) {
      try {
        await insertSpotPost(newData);
      } catch (err) {
        AlertError({ title: '스팟 공유 게시물을 업로드하지 못했습니다.' });
      }
      navigate('/spotshare');
    }
  };

  return (
    <St.FormContainer>
      <St.WriteForm onSubmit={handleOnSumbit}>
        <St.SelectListBox>
          <LocationDropDown setLocation={setLocation} />
          <SpotCalendar setSpotDate={setSpotDate} />
          <StarRate setStar={setStar} />
        </St.SelectListBox>
        <div>
          <St.SpotShareTitleInput maxLength={100} type="text" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <SpotShareEditor editorHtml={editorHtml} setEditorHtml={setEditorHtml} />
        <SpotMap setLatitude={setLatitude} setLongitude={setLongitude} address={address} setAddress={setAddress} />
        <St.ButtonBox>
          <Button type="button" styleType={BtnStyleType.BTN_DARK} onClick={() => navigate('/spotshare')}>
            취소하기
          </Button>
          <Button type="submit" styleType={BtnStyleType.BTN_DARK}>
            등록하기
          </Button>
        </St.ButtonBox>
      </St.WriteForm>
    </St.FormContainer>
  );
}
