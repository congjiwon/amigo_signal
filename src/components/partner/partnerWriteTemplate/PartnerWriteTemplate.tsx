import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getInterests } from '../../../api/supabase/interest';
import { insertPost } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import { BtnStyleType } from '../../../types/styleTypes';
import Button from '../../common/button/Button';
import PartnerCalendar from '../../common/calendar/PartnerCalendar';
import { PartnerDropDown } from '../../common/dropDown/DropDown';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import { AlertError, AlertWarning } from '../../common/modal/alert';
import * as St from './style';

function PartnerWriteTemplate() {
  const [location, setLocation] = useState<string[]>([]);
  const [partnerDates, setPartnerDates] = useState<string[]>([]);
  const [partner, setPartner] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [chatUrl, setChatUrl] = useState<string>('');
  const [interestTagList, setInterestTagList] = useState<Tables<'interest'>[]>([]);
  const [interestUrl, setInterestUrl] = useState<string[]>([]);
  const [interestDiscription, setInterestDiscription] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [writerId, setWriterId] = useState<string>('');
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const authId = window.localStorage.getItem('authId');

  const getInterestsList = async () => {
    const Interests = await getInterests();
    const InterestsData = Interests.data!;
    if (InterestsData) {
      setInterestTagList(InterestsData);
    }
  };

  useEffect(() => {
    getInterestsList();
  }, []);

  useEffect(() => {
    if (!!authId) {
      setWriterId(authId);
    }
    if (!authId) {
      navigate('/login');
    }
  }, [navigate, authId]);

  const handleInterestClick = (imageUrl: string, discription: string) => {
    if (interestUrl.includes(imageUrl)) {
      // 이미 추가된 태그를 클릭한 경우 제거
      setInterestUrl((prevInterestUrl) => prevInterestUrl.filter((urlImage) => urlImage !== imageUrl));
      setInterestDiscription((prevInterestDiscription) => prevInterestDiscription.filter((urlDiscription) => urlDiscription !== discription));
    } else if (interestUrl.length >= 3) {
      // 3개 이상의 태그를 추가하려는 경우 return
      return;
    } else {
      // 태그 추가
      setInterestUrl((prevInterestUrl) => [...prevInterestUrl, imageUrl]);
      setInterestDiscription((prevInterestDiscription) => [...prevInterestDiscription, discription]);
    }
  };

  //채팅 url 유효성검사
  const chatUrlValidation = (value: string): boolean => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlPattern.test(value)) {
      return true;
    }
    return false;
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

  const validation = (): boolean => {
    if (location.length < 1) {
      AlertWarning({ title: '국가를 선택해주세요.' });
      return false;
    } else if (partnerDates.length < 1) {
      AlertWarning({ title: '날짜를 선택해주세요.' });
      return false;
    } else if (title.length < 1) {
      AlertWarning({ title: '제목을 입력해주세요.' });
      return false;
    } else if (content.length < 1) {
      AlertWarning({ title: '내용을 입력해주세요.' });
      return false;
    }
    if (chatUrl.length >= 1 && !chatUrlValidation(chatUrl)) {
      AlertWarning({ title: '오픈채팅 주소를 확인해주세요.' });
      return false;
    }
    return true;
  };
  // 글 작성 버튼 클릭 핸들러
  const handleWriteClick = async () => {
    const time = currentTime();
    const dataToInsert = {
      title,
      content,
      isOpen: true,
      startDate: partnerDates[0],
      endDate: partnerDates[1],
      openChat: chatUrl,
      createdAt: time,
      interestUrl,
      interestDiscription,
      region: location[0],
      country: location[1],
      numOfPeople: partner,
      writerId,
    };
    if (validation()) {
      setDisable(true);
      try {
        setLoading(true);
        await insertPost(dataToInsert);
      } catch (err) {
        AlertError({ title: '동행 찾기 게시물을 업로드하지 못했습니다.' });
      }
      setLoading(false);
      navigate('/partner');
    }
  };

  return (
    <St.FormContainer>
      <St.WriteForm>
        <St.SelectListBox>
          <LocationDropDown setLocation={setLocation} />
          <PartnerCalendar setPartnerDates={setPartnerDates} />
          <PartnerDropDown setPartner={setPartner} />
        </St.SelectListBox>
        <St.WriteInput
          maxLength={50}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder="원활한 동료찾기를 위해 지역명을 함께 입력해주세요"
        ></St.WriteInput>
        <St.TextArea
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          placeholder="1. 현재 동행이 있나요? &#13;&#10;2. 어떤 동행을 찾고 있나요? &#13;&#10;3. 원하는 여행 코스가 있다면 적어주세요  "
        ></St.TextArea>
        <St.ExplanationBox>
          <p>오픈채팅 주소</p>
          <St.WriteInput
            value={chatUrl}
            onChange={(event) => {
              setChatUrl(event.target.value);
            }}
            placeholder="오픈채팅방 주소를 입력해주세요"
          ></St.WriteInput>
        </St.ExplanationBox>
        <St.ExplanationBox>
          <p>태그 선택 (최대 3개까지 선택가능)</p>
          <St.TegBox>
            {interestTagList &&
              interestTagList.map((item) => {
                return (
                  <St.TegButton
                    key={item.id}
                    type="button"
                    onClick={() => handleInterestClick(item.imageUrl as string, item.discription as string)}
                    style={{
                      backgroundColor: interestUrl.includes(item.imageUrl as string) ? 'lightblue' : 'white',
                    }}
                  >
                    <St.TegImgBox>
                      <St.TegImg src={item.imageUrl!} />
                    </St.TegImgBox>
                    <span>{item.discription}</span>
                  </St.TegButton>
                );
              })}
          </St.TegBox>
        </St.ExplanationBox>
        <St.ButtonBox>
          <Button type="button" styleType={BtnStyleType.BTN_DARK} onClick={() => navigate('/partner')}>
            취소하기
          </Button>
          <Button type="button" disabled={disable} styleType={BtnStyleType.BTN_DARK} onClick={handleWriteClick}>
            작성하기
          </Button>
        </St.ButtonBox>
      </St.WriteForm>
      {loading && <p>로딩중</p>}
    </St.FormContainer>
  );
}

export default PartnerWriteTemplate;
