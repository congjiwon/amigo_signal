import { useState } from 'react';
import { supabase } from '../../../api/supabase/supabaseClient';
import { useNavigate } from 'react-router';
import { Alert } from '../../common/modal/alert';

const SignInForm = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) Alert({ title: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    else {
      navigate('/partner');
    }
  };

  return (
    <form onSubmit={signInHandler}>
      <div>로그인</div>
      <div>
        {/* <label>이메일</label> */}
        <input
          className="auth-input"
          placeholder=" email"
          type="text"
          value={loginEmail}
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
          autoFocus
        />
        {/* <label>비밀번호</label> */}
        <input
          className="auth-input"
          placeholder=" password"
          type="password"
          value={loginPassword}
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">로그인</button>
        <button type="button">취소</button>
      </div>
    </form>
  );
};

export default SignInForm;
