import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getInterests } from '../../../api/supabase/interest';
import { getApplicantList, getConfirmedApplicantList, getPartnerPost, updatePartnerPost } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import { BtnStyleType } from '../../../types/styleTypes';
import useSessionStore from '../../../zustand/store';
import Button from '../../common/button/Button';
import { UpdatePartnerCalendar } from '../../common/calendar/PartnerCalendar';
import { UpdatePartnerDropDown } from '../../common/dropDown/DropDown';
import { UpdateLocationDropDown } from '../../common/dropDown/LocationDropDown';
import LoadingSpinner from '../../common/loadingSpinner/LoadingSpinner';
import { AlertError, AlertWarning } from '../../common/modal/alert';
import * as St from './style';

function PartnerUpdateTemplate({ postId }: { postId: string }) {
  const { data: partnerPost, isLoading, isError } = useQuery(['partnerPost', postId], () => getPartnerPost({ postId }));
  const [applicantList, setApplicantList] = useState<Tables<'applicants'>[]>([]);
  const [confirmedApplicantList, setConfirmedApplicantList] = useState<Tables<'applicants'>[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [partnerDates, setPartnerDates] = useState<string[]>([]);
  const [partner, setPartner] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [chatUrl, setChatUrl] = useState('');
  const [interestTagList, setInterestTagList] = useState<Tables<'interest'>[]>([]);
  const [interestUrl, setInterestUrl] = useState<string[]>([]);
  const [interestDiscription, setInterestDiscription] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [writerId, setWriterId] = useState<string>('');
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
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
    const fetchApplicant = async () => {
      if (!postId) return;
      const { data, error } = await getApplicantList(postId);
      if (error || !data) {
        console.error('신청자 목록을 가져오는 과정에서 error 발생', error);
        setApplicantList([]);
      } else {
        setApplicantList(data);
      }
    };
    fetchApplicant();
    const fetchConfirmedPartnerList = async () => {
      if (postId) {
        const response = await getConfirmedApplicantList(postId!);
        if (response.data !== null) {
          setConfirmedApplicantList(response.data);
        }
        console.log('response', response.data);
      }
    };
    fetchConfirmedPartnerList();
  }, [postId]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (partnerPost) {
        setLocation([partnerPost.region, partnerPost?.country.country!]);
        setPartnerDates([partnerPost.startDate, partnerPost.endDate]);
        setPartner(partnerPost.numOfPeople);
        setTitle(partnerPost.title);
        setContent(partnerPost.content);
        setChatUrl(partnerPost.openChat);
        setInterestUrl(partnerPost.interestUrl);
        setWriterId(partnerPost.writerId as string);
      }
    };
    fetchPostData();
  }, [partnerPost]);

  useEffect(() => {
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

  const mutation = useMutation(updatePartnerPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerPost']);
      navigate(`/partner/detail/${postId}`);
    },
    onError: () => {
      AlertError({});
      setDisable(false);
    },
  });

  const validation = (): boolean => {
    if (authId !== writerId) {
      AlertError({ title: '수정이 불가능 합니다.', text: '글 작성유저가 아닙니다.' });
      navigate(`/partner/detail/${postId}`);
      return false;
    }
    if (applicantList.length >= 1 || confirmedApplicantList.length >= 1) {
      AlertError({ title: '수정이 불가능 합니다.', text: '동행 신청이 시작되었습니다.' });
      navigate(`/partner/detail/${postId}`);
      return false;
    }
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

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  // 글 작성 버튼 클릭 핸들러
  const handleUpdateClick = () => {
    if (validation()) {
      const dataToInsert = {
        id: postId,
        title,
        content,
        isOpen: true,
        startDate: partnerDates[0],
        endDate: partnerDates[1],
        openChat: chatUrl,
        interestUrl,
        region: location[0],
        country: location[1],
        numOfPeople: partner,
        writerId: userId,
      };
      setDisable(true);
      mutation.mutate(dataToInsert);
    }
  };

  return (
    <St.FormContainer>
      <St.WriteForm>
        <St.SelectListBox>
          <St.ExplanationBox>
            <UpdateLocationDropDown location={[partnerPost?.region!, partnerPost?.country.country!]} setLocation={setLocation} />
          </St.ExplanationBox>
          <St.ExplanationBox>
            <UpdatePartnerCalendar startDate={partnerPost?.startDate!} endDate={partnerPost?.endDate!} setPartnerDates={setPartnerDates} />
          </St.ExplanationBox>
          <St.ExplanationBox>
            <UpdatePartnerDropDown partner={partnerPost?.numOfPeople!} setPartner={setPartner} />
          </St.ExplanationBox>
        </St.SelectListBox>
        <St.WriteInput
          maxLength={100}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder="원활한 동료찾기를 위해 지역명을 함께 입력해주세요"
        ></St.WriteInput>
        <St.TextArea
          maxLength={5000}
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
          <Button type="button" styleType={BtnStyleType.BTN_DARK} onClick={() => navigate(`partner/detail/${postId}`)}>
            취소
          </Button>
          <Button type="button" disabled={disable} styleType={BtnStyleType.BTN_DARK} onClick={handleUpdateClick}>
            수정완료
          </Button>
        </St.ButtonBox>
      </St.WriteForm>
      {disable && <LoadingSpinner />}
    </St.FormContainer>
  );
}

export default PartnerUpdateTemplate;
