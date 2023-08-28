import React, { useEffect, useRef, useState } from 'react';
import SpotShareEditor from '../spotShareEditor/SpotShareEditor';
import useSessionStore from '../../../zustand/store';
import { insertSpotPost } from '../../../api/supabase/spotPosts';
import { supabase } from '../../../api/supabase/supabaseClient';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import { StarDropDown } from '../../common/dropDown/DropDown';
import SpotCalendar from '../../common/calendar/SpotCalendar';
import * as St from './style';
import { Alert } from 'antd';
import { AlertError } from '../../common/modal/alert';

export default function SpotShareUpdate() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [title, setTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef();
  const [location, setLocation] = useState<string[]>([]);
  const [spotDate, setSpotDate] = useState<string>('');
  const [star, setStar] = useState<number>(5);

  const handleEditorChange = (newHtml: string) => {
    setEditorHtml(newHtml);
  };

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

    const newData = { createdAt: nowData, title, content: editorHtml, region: location[0], country: location[1], starRate: star, visitDate: spotDate, writerId: userId as string, marker: ['위도', '경도'], address: '한국 부산~' };
    try {
      await insertSpotPost(newData);
    } catch (err) {
      AlertError({ title: '스팟 공유 게시물을 업로드하지 못했습니다.' });
    }
  };

  const [receivedData, setReceivedData] = useState<string | undefined>('');

  const getDataTest = async () => {
    let { data: spotPosts, error } = await supabase.from('spotPosts').select('*').eq('id', '4fb153e8-6af9-43c4-b7a3-fa26ddcff294').single();

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
        <SpotShareEditor quillRef={quillRef} editorHtml={editorHtml} onEditorChange={handleEditorChange} />
        <button type="submit">등록</button>

        <hr />
        <button onClick={getDataTest}>가져오기</button>
        {receivedData && <div dangerouslySetInnerHTML={{ __html: receivedData }} />}
      </form>
    </div>
  );
}
