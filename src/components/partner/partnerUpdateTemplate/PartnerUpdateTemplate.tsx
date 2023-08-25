import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tables } from '../../../api/supabase/supabase';
import { getInterests } from '../../../api/supabase/interest';
import { getPartnerPost, updatePartnerPost } from '../../../api/supabase/partner';
import Button from '../../common/button/Button';
import { BtnStyleType } from '../../../types/styleTypes';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import { PartnerDropDown } from '../../common/dropDown/DropDown';
import PartnerCalendar from '../../common/calendar/PartnerCalendar';
import useSessionStore from '../../../zustand/store';

function PartnerUpdateTemplate({ postId }: { postId: string }) {
  const { data: partnerPost } = useQuery(['partnerPost', postId], () => getPartnerPost({ postId }));
  const [location, setLocation] = useState<string[]>([]);
  const [partnerDates, setPartnerDates] = useState<string[]>([]);
  const [partner, setPartner] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [chatUrl, setChatUrl] = useState('');
  const [interestTagList, setInterestTagList] = useState<Tables<'interest'>[]>([]);
  const [interestUrl, setInterestUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [writerId, setWriterId] = useState<string>('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const session = useSessionStore((state) => state.session);

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
    const fetchPostData = async () => {
      if (partnerPost) {
        const postData = partnerPost.data!;
        setLocation([postData.region, postData.country]);
        setPartnerDates([postData.startDate, postData.endDate]);
        setPartner(postData.numOfPeople);
        setTitle(postData.title);
        setContent(postData.content);
        setChatUrl(postData.openChat);
        setInterestUrl(postData.interestUrl);
      }
    };
    fetchPostData();
  }, [partnerPost]);

  useEffect(() => {
    if (!!session) {
      setWriterId(session.user.id);
    }
    if (!session) {
      navigate('/login');
    }
  }, [navigate, session]);

  const handleInterestClick = (imageUrl: string) => {
    if (interestUrl.includes(imageUrl)) {
      // 이미 추가된 태그를 클릭한 경우 제거
      setInterestUrl((prevInterestUrl) => prevInterestUrl.filter((url) => url !== imageUrl));
    } else if (interestUrl.length >= 3) {
      // 3개 이상의 태그를 추가하려는 경우 알림
      alert('태그는 3개까지');
    } else {
      // 태그 추가
      setInterestUrl((prevInterestUrl) => [...prevInterestUrl, imageUrl]);
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

  const mutation = useMutation(updatePartnerPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['partnerPost']);
    },
  });

  const validation = (): boolean => {
    if (location.length < 1) {
      alert('지역입력');
      return false;
    } else if (partnerDates.length < 1) {
      alert('날짜입력');
      return false;
    } else if (title.length < 1) {
      alert('제목입력');
      return false;
    } else if (content.length < 1) {
      alert('내용입력');
      return false;
    }
    if (chatUrl.length >= 1 && !chatUrlValidation(chatUrl)) {
      alert('올바른 오픈채팅 주소가 아닙니다.');
      return false;
    }
    return true;
  };

  // 글 작성 버튼 클릭 핸들러
  const handleUpdateClick = async () => {
    if (validation()) {
      const time = currentTime();
      const dataToInsert = {
        id: postId,
        title,
        content,
        isOpen: true,
        startDate: partnerDates[0],
        endDate: partnerDates[1],
        openChat: chatUrl,
        createdAt: time,
        interestUrl,
        region: location[0],
        country: location[1],
        numOfPeople: partner,
        writerId,
      };
      setLoading(true);
      await mutation.mutate(dataToInsert);
      setLoading(false);
      navigate(`/partner/detail/${postId}`);
    }
  };

  return (
    <>
      <form>
        <LocationDropDown setLocation={setLocation} />
        <br />
        <PartnerCalendar setPartnerDates={setPartnerDates} />
        <br />
        <PartnerDropDown setPartner={setPartner} />
        <span>오픈채팅 주소</span>
        <input
          value={chatUrl}
          onChange={(event) => {
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
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          rows={10}
          cols={100}
          placeholder="1. 현제 동행이 있나요? &#13;&#10;2. 어떤 동행을 찾고 있나요? &#13;&#10;3. 원하는 여행 코스가 있다면 적어주세요  "
        ></textarea>
        <br />
        <span>태그선택</span>
        {interestTagList &&
          interestTagList.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleInterestClick(item.imageUrl as string)}
                style={{
                  margin: '20px',
                  backgroundColor: interestUrl.includes(item.imageUrl as string) ? 'lightblue' : 'white',
                }}
              >
                <p>{item.content}</p>
              </button>
            );
          })}
        <br />
        <Button type="button" styleType={BtnStyleType.BTN_DARK} onClick={handleUpdateClick}>
          수정하기
        </Button>
        <Button type="button" styleType={BtnStyleType.BTN_DARK}>
          취소하기
        </Button>
      </form>
      {loading && <p>로딩중</p>}
    </>
  );
}

export default PartnerUpdateTemplate;
