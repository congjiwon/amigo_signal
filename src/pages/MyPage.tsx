import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../api/supabase/supabaseClient';
import MyAllContents from '../components/myPage/myAllContents/MyAllContents';

function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session === null) {
        alert('로그인 후 이용해주세요.');
        navigate('/login');
      }
    });
  }, []);

  return (
    <>
      <MyAllContents />
    </>
  );
}

export default MyPage;
