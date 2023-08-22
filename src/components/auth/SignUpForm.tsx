import { supabase } from '../../api/supabase/supabaseClient';
import Button from '../common/button/Button';
import { BtnStyleType } from '../../types/styleTypes';
import { useNavigate } from 'react-router';
import { Input } from '../common/input/Input';
import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

type newUserType = {
  email: string;
  nickName: string;
  password: string;
  passwordConfirm?: string;
  gender: string;
  birthday: string;
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<newUserType>({ email: '', nickName: '', password: '', passwordConfirm: '', gender: '여성', birthday: '' });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // useEffect(() => {
  //   console.log(newUser);
  // }, [newUser]);
  // http://localhost:3000/signup?email=tadadadacoding%40gmail.com&nickName=jy&password=1234asdf%21&passwordConfirm=1234asdf%21&gender=%EC%97%AC%EC%84%B1&birthday=2000-01-01
  const signUpFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
      options: {
        data: {
          nickName: newUser.nickName,
          gender: newUser.gender,
          birthday: newUser.birthday,
        },
      },
    });
    const uid = authData.user?.id;
    if (authErr) {
      if (authErr?.message === 'Unable to validate email address: invalid format') return alert('이메일 형태가 올바르지 않습니다.');
      else if (authErr?.message === 'User already registered') return alert('이미 일치하는 회원이 존재합니다.');
    }

    const { error: dbUserErr } = await supabase.from('users').insert({
      id: uid,
      email: newUser.email,
      nickName: newUser.nickName,
      gender: newUser.gender,
      birthday: newUser.birthday,
    });

    if (dbUserErr) return alert('db에러발생');
    return alert('회원가입이 정상적으로 처리 되었습니다!');
  };
  return (
    <FormWrapper>
      <form onSubmit={signUpFn}>
        <FormRow>
          <div>
            <label htmlFor="email">이메일</label>
            <Input id="email" name="email" type="email" value={newUser.email} inputStyleType="auth" placeholder="이메일을 입력해주세요." border={false} onChange={onChangeInput} />
          </div>
          <ValidationMsgBox>warning msg box</ValidationMsgBox>
        </FormRow>
        <FormRow>
          <div>
            <label htmlFor="nickName">닉네임</label>
            <Input id="nickName" name="nickName" type="text" value={newUser.nickName} inputStyleType="auth" placeholder="닉네임을 입력해주세요." border={false} onChange={onChangeInput} />
          </div>
          <ValidationMsgBox>warning msg box</ValidationMsgBox>
        </FormRow>
        <FormRow>
          <div>
            <label htmlFor="password">비밀번호</label>
            <Input id="password" name="password" type="password" value={newUser.password} inputStyleType="auth" placeholder="비밀번호를 입력해주세요." border={false} onChange={onChangeInput} />
          </div>
          <ValidationMsgBox>warning msg box</ValidationMsgBox>
        </FormRow>
        <FormRow>
          <div>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <Input id="passwordConfirm" name="passwordConfirm" type="password" value={newUser.passwordConfirm} inputStyleType="auth" placeholder="비밀번호를 입력해주세요." border={false} onChange={onChangeInput} />
          </div>
          <ValidationMsgBox>warning msg box</ValidationMsgBox>
        </FormRow>
        <FormRow>
          <div>
            <span>성별</span>
            <label htmlFor="female">
              여성
              <input id="female" type="radio" name="gender" value="여성" checked={newUser.gender === '여성'} onChange={onChangeInput} />
            </label>
          </div>
          <div>
            <label htmlFor="male">
              남성
              <input id="male" type="radio" name="gender" value="남성" checked={newUser.gender === '남성'} onChange={onChangeInput} />
            </label>
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="">생년월일</label>
          <Input id="birthday" name="birthday" value={newUser.birthday} type="text" inputStyleType="auth" placeholder="1995-01-01" border={false} onChange={onChangeInput} />
        </FormRow>
        <div>
          <Button styleType={BtnStyleType.BTN_PRIMARY} onClick={() => navigate('/')}>
            홈으로
          </Button>
          <Button type="submit" styleType={BtnStyleType.BTN_SUBMIT}>
            가입하기
          </Button>
        </div>
      </form>
    </FormWrapper>
  );
}
const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const FormRow = styled.div`
  margin-bottom: 16px;
`;

const ValidationMsgBox = styled.div`
  margin-top: 8px;
  color: red;
`;
