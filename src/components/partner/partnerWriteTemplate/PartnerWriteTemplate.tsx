import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabase/supabaseClient';
import Button from '../../common/button/Button';
import { DatePicker, Space, Col, InputNumber, Row, Slider } from 'antd';
import { BtnStyleType } from '../../../types/styleTypes';
import { styled } from 'styled-components';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import { insertPost } from '../../../api/supabase/partner';
import { getAuthId } from '../../../api/supabase/users';
interface interestT {
  id: number;
  name: string;
  imageUrl: string | null;
}

function PartnerWriteTemplate() {
  const [location, setLocation] = useState<string[]>([]);
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [interestTagList, setInterestTagList] = useState<interestT[]>([]);
  const [interestUrl, setInterestUrl] = useState<string[]>([]);
  const [filteredInterestUrl, setFilteredInterestUrl] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chatUrl, setChatUrl] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [writerId, setWriterId] = useState('');
  const { RangePicker } = DatePicker;

  const getInterestsList = async () => {
    let { data: interest, error } = await supabase.from('interest').select('*');
    if (interest) {
      setInterestTagList(interest);
    }
  };

  useEffect(() => {
    getInterestsList();
    getWriterId();
  }, []);

  const handleInterestClick = (name: string) => {
    setInterestUrl((prevInterestUrl) => [...prevInterestUrl, name]);
  };

  const filteredSet = new Set(interestUrl);
  useEffect(() => {
    setFilteredInterestUrl(Array.from(filteredSet));
  }, [interestUrl]);

  //날짜
  const getDateHandle = (dates: any, dateString: any) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  //지역
  useEffect(() => {
    setRegion(location[0]);
    setCountry(location[1]);
  }, [location]);

  //인원수 입력
  const numOfPeopleHandler = (newValue: number | null) => {
    if (typeof newValue == 'number') {
      setNumOfPeople(newValue);
    }
  };

  //채팅 url 유효성검사
  const onChangeChatUrl = function (value: string) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlPattern.test(value)) {
      setChatUrl(value);
    } else {
      alert('유효한 주소 url을 입력해주세요');
    }
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

  //작성자 id 가져오기
  const getWriterId = async () => {
    const authId = await getAuthId();
    if (authId) {
      setWriterId(authId);
    }
  };

  // 글 작성 버튼 클릭 핸들러
  const handleWriteClick = async () => {
    const time = currentTime();
    const dataToInsert = [
      {
        title,
        content: contents,
        isOpen: true,
        startDate,
        endDate,
        openChat: chatUrl,
        createdAt: time,
        interestUrl: filteredInterestUrl, // todo. 후에 이미지 url로 변환해야함
        region,
        country,
        numOfPeople,
        writerId,
      },
    ];
    console.log(dataToInsert);
    setLoading(true);
    await insertPost(dataToInsert);
    setLoading(false);
  };

  return (
    <>
      <form>
        <LocationDropDown setLocation={setLocation} />
        <br />
        <Space direction="vertical" size={12}>
          <RangePicker onChange={getDateHandle} />
        </Space>
        <Space style={{ width: '100%' }} direction="vertical">
          <Row>
            <Col span={12}>
              <Slider min={1} max={10} onChange={numOfPeopleHandler} value={numOfPeople} />
            </Col>
            <Col span={4}>
              <InputNumber min={1} max={10} style={{ margin: '0 16px' }} value={numOfPeople} onChange={numOfPeopleHandler} />
            </Col>
          </Row>
        </Space>
        <span>오픈채팅 주소</span>
        <input
          value={chatUrl}
          onChange={(event) => {
            // onChangeChatUrl(event.target.value);
            setChatUrl(event.target.value);
          }}
          placeholder="오픈채팅방 주소를 입력해주세요"
        ></input>
        <br />
        <span>제목</span>
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder="원활한 동료찾기를 위해 지역명을 함께 입력해주세요"
        ></input>
        <br />
        <textarea
          value={contents}
          onChange={(event) => {
            setContents(event.target.value);
          }}
          rows={10}
          cols={100}
          placeholder="1. 현제 동행이 있나요? &#13;&#10;2. 어떤 동행을 찾고 있나요? &#13;&#10;3. 원하는 여행 코스가 있다면 적어주세요  "
        ></textarea>
        <br />
        <span>태그선택</span>
        {interestTagList &&
          interestTagList.map((item: any) => {
            return (
              <div key={item.id}>
                <span onClick={() => handleInterestClick(item.name)} style={{ margin: '10px' }}>
                  {item.name}
                </span>
              </div>
            );
          })}
        <br />
        <Button type="button" styleType={BtnStyleType.BTN_DARK} onClick={handleWriteClick}>
          작성하기
        </Button>
        <Button type="button" styleType={BtnStyleType.BTN_DARK}>
          취소하기
        </Button>
      </form>
    </>
  );
}

export default PartnerWriteTemplate;
