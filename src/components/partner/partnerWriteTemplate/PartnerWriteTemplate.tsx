import React from 'react';
import PartnerCalendar from '../../common/calendar/PartnerCalendar';
import NumOfPartner from './NumOfPartner';
import { Input } from '../../common/input';

function PartnerWriteTemplate() {
  return (
    <>
      <div>국가별 드롭다운</div>
      <PartnerCalendar />
      <NumOfPartner />
      <span>오픈채팅 주소</span>
      <input placeholder="오픈채팅방 주소를 입력해주세요"></input>
      <br />
      <span>제목</span>
      <input placeholder="원활한 동료찾기를 위해 지역명을 함께 입력해주세요"></input>
      <div>
        <textarea
          placeholder="1. 현제 동행이 있나요? &#10;  2. 어떤 동행을 찾고 있나요? &#10;  &#10;  &#10; 3. 원하는 여행 코스가 있다면 적어주세요  "
        ></textarea>
      </div>
    </>
  );
}

export default PartnerWriteTemplate;
