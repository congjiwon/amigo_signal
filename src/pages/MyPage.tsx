import { useEffect } from 'react';
import { useNavigate } from 'react-router';
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
      <MyAllContents />
    </>
  );
}

export default MyPage;
