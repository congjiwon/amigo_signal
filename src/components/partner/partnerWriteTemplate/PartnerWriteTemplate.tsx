import React, { useEffect, useState } from 'react';
import PartnerCalendar from '../../common/calendar/PartnerCalendar';
import NumOfPartner from './NumOfPartner';
import { supabase } from '../../../api/supabase/supabaseClient';

interface interest {
  id: number;
  name: string;
}

interface writeInfo {
  applicant: string;
  content?: string;
  createdAt: string;
  endDate: string;
  flagUrl?: string;
  id?: string;
  interest: number[];
  isOpen?: boolean;
  location: number;
  numOfPeople: number;
  openChat?: string;
  startDate: string;
  title?: string;
  //   writerId: string;
}

function PartnerWriteTemplate() {
  const [selectTag, setSelectTag] = useState<interest[]>();

  const [chatUrl, onChangeChatUrl] = useState('');
  const [title, onChangeTitle] = useState('');
  const [contents, onChangeContents] = useState('');

  let interestArr: interest[] | undefined;

  const getInterestsList = async () => {
    let { data: interest, error } = await supabase.from('interest').select('*');
    if (interest) {
      return interest;
    }
  };

  async function fetchData() {
    try {
      interestArr = await getInterestsList();
      setSelectTag(interestArr);
      //   console.log('함수 안 interestArr => ', interestArr);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log('함수 밖 interestArr => ', selectTag);

  return (
    <>
      <div>국가별 드롭다운</div>
      <PartnerCalendar />
      <NumOfPartner />
      <span>오픈채팅 주소</span>
      <input
        value={chatUrl}
        onChange={(event) => {
          onChangeChatUrl(event.target.value);
        }}
        placeholder="오픈채팅방 주소를 입력해주세요"
      ></input>
      <br />
      <span>제목</span>
      <input
        value={title}
        onChange={(event) => {
          onChangeTitle(event.target.value);
        }}
        placeholder="원활한 동료찾기를 위해 지역명을 함께 입력해주세요"
      ></input>
      <textarea
        value={contents}
        onChange={(event) => {
          onChangeContents(event.target.value);
        }}
        rows={10}
        cols={100}
        placeholder="1. 현제 동행이 있나요? &#13;&#10;2. 어떤 동행을 찾고 있나요? &#13;&#10;3. 원하는 여행 코스가 있다면 적어주세요  "
      ></textarea>
      <br />
      <span>태그선택</span>
      {selectTag &&
        selectTag.map((item: any) => {
          return (
            <>
              <p>{item.name}</p>
            </>
          );
        })}
      {/* <span onClick={() => selectTagHandle('커피')}>☕️</span> <span onClick={() => selectTagHandle('식사')}>🍽️</span> <span onClick={() => selectTagHandle('맥주')}>🍺</span> */}
    </>
  );
}

export default PartnerWriteTemplate;
