import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import MetaTags from '../components/common/metaTags/MetaTags';
import { Alert } from '../components/common/modal/alert';
import MyAllContents from '../components/myPage/myAllContents/MyAllContents';

function MyPage() {
  const navigate = useNavigate();
  const localSesstion = localStorage.getItem('authId');

  useEffect(() => {
    if (localSesstion === null) {
      Alert({ title: '로그인 후 이용해주세요.' });
      navigate('/login');
    }
  }, []);

  // TODO: spinner 또는 텍스트
  if (localSesstion === null) {
    return <></>;
  }

  return (
    <>
      <MetaTags
        title="마이 페이지 | Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl="https://amigo-signal.com/mypage"
        ogDescription="작성글과 북마크, 좋아요 한 글 확인, 프로필 수정을 할 수 있습니다."
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      <MyAllContents />
    </>
  );
}

export default MyPage;
