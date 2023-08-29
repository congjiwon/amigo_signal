import React, { useState } from 'react';
import { insertSpotPost } from '../../../api/supabase/spotPosts';
import { supabase } from '../../../api/supabase/supabaseClient';
import useSessionStore from '../../../zustand/store';
import SpotCalendar from '../../common/calendar/SpotCalendar';
import { StarDropDown } from '../../common/dropDown/DropDown';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import { AlertError } from '../../common/modal/alert';
import SpotShareEditor from '../spotShareEditor/SpotShareEditor';
import * as St from './style';

export default function SpotShareUpdate() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [title, setTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [location, setLocation] = useState<string[]>([]);
  const [spotDate, setSpotDate] = useState<string>('');
  const [star, setStar] = useState<number>(5);

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

  const handleOnSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nowData = currentTime();

    const newData = { createdAt: nowData, title, content: editorHtml, region: location[0], country: location[1], starRate: star, visitDate: spotDate, writerId: userId as string, latitude: 37.5642135, longitude: 127.0016985, address: '한국 부산~' };
    try {
      await insertSpotPost(newData);
    } catch (err) {
      AlertError({ title: '스팟 공유 게시물을 업로드하지 못했습니다.' });
    }
  };

  const [receivedData, setReceivedData] = useState<string | undefined>('');

  const getDataTest = async () => {
    let { data: spotPosts, error } = await supabase.from('spotPosts').select('*').eq('id', 'a09053db-3cd0-4f09-860a-70029f04188e').single();

    setReceivedData(spotPosts?.content);
  };
  return (
    <div>
      <form onSubmit={handleOnSumbit}>
        <div>
          <LocationDropDown setLocation={setLocation} />
          <SpotCalendar setSpotDate={setSpotDate} />
          <StarDropDown setStar={setStar} />
        </div>
        <div>
          <St.SpotShareTitleInput type="text" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <SpotShareEditor editorHtml={editorHtml} setEditorHtml={setEditorHtml} />

        <button></button>
        <hr />
        <button type="submit">등록</button>
        <button onClick={getDataTest}>가져오기</button>
        {receivedData && <div dangerouslySetInnerHTML={{ __html: receivedData }} />}
      </form>
    </div>
  );
}
