import { useNavigate } from 'react-router';
import MyAllContents from '../components/myPage/myAllContents/MyAllContents';
import useSessionStore from '../zustand/store';
import { Alert } from '../components/common/modal/alert';
import { useEffect } from 'react';

function MyPage() {
  const session = useSessionStore((state) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (session === null) {
      // Alert({ title: '로그인 후 이용해주세요.' });
      alert('로그인 후 이용해주세요.');
      navigate('/login');
    }
  }, []);

  return (
    <>
      <MyAllContents />
    </>
  );
}

export default MyPage;
