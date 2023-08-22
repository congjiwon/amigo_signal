import { supabase } from '../../api/supabase/supabaseClient';
import Button from '../common/button/Button';
import { BtnStyleType } from '../../types/styleTypes';
import { useNavigate } from 'react-router';
import { Input } from '../common/input/Input';
import SpotCalendar from '../common/calendar/SpotCalendar';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { getFlag } from '../../api/flag/flag';

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
    const { name, value } = e.target;
    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    console.log(newUser);
  }, [newUser]);

  const signUpFn = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'tadadadacoding@gmail.com',
      password: '1234asdf!',
      options: {
        data: {
          nickName: 'John',
          gender: 'female',
          birthday: '1999-05-05',
        },
      },
    });
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
          <SpotCalendar />
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
