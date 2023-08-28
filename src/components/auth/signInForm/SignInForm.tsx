import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../../api/supabase/supabaseClient';
import { Alert } from '../../common/modal/alert';
import * as St from './style';
import { Link } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';

const SignInForm = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const [submitStatus, setSubmitStatus] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));

    // input reset 버튼 활성화
    if (value.length > 0) {
      e.target.classList.add('active-reset-btn');
    } else {
      e.target.classList.remove('active-reset-btn');
    }

    // submit 버튼 활성화
    if (name === 'email' && value.length > 0 && loginData.password.length > 0) {
      setSubmitStatus(false);
    } else if (name === 'password' && value.length > 0 && loginData.email.length > 0) {
      setSubmitStatus(false);
    } else {
      setSubmitStatus(true);
    }
  };

  const handleInputResetClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.previousElementSibling?.classList.remove('active-reset-btn');
    const name = e.currentTarget.previousElementSibling?.getAttribute('name');
    name && setLoginData((prev) => ({ ...prev, [name]: '' }));
    setSubmitStatus(true);
  };

  const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginData;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data) {
      localStorage.setItem('authId', data.user?.id as string);
    } // 설빈 : 로그아웃할 때 지워주기

    if (error) Alert({ title: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    else {
      navigate('/partner');
    }
  };

  return (
    <St.SignInSection>
      <St.SignInLayout>
        <form onSubmit={signInHandler}>
          <St.SignInInputsBox>
            <St.SignInTitle>로그인</St.SignInTitle>
            <St.SignInInputBox>
              <label htmlFor="loginEmail">이메일</label>
              <input id="loginEmail" className="auth-input" name="email" type="text" value={loginData.email} onChange={handleInputChange} autoFocus />
              <button type="button" className="btn-reset" onClick={handleInputResetClick}>
                <FiXCircle />
              </button>
            </St.SignInInputBox>
            <St.SignInInputBox>
              <label htmlFor="loginPwd">비밀번호</label>
              <input id="loginPwd" name="password" className="auth-input" type="password" value={loginData.password} onChange={handleInputChange} />
              <button type="button" className="btn-reset" onClick={handleInputResetClick}>
                <FiXCircle />
              </button>
            </St.SignInInputBox>
            <St.JoinBox>
              <p>회원가입하고 동행을 찾아보세요!</p>
              <Link to="/signUp">회원가입</Link>
            </St.JoinBox>
          </St.SignInInputsBox>
          <St.BtnSignInBox>
            <button type="submit" disabled={submitStatus}>
              로그인
            </button>
          </St.BtnSignInBox>
        </form>
      </St.SignInLayout>
    </St.SignInSection>
  );
};

export default SignInForm;
