import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../../api/supabase/supabaseClient';
import { BtnStyleType } from '../../../types/styleTypes';
import useBirthdayStore from '../../../zustand/birthdayData';
import BirthdaySelect from '../../common/birthdaySelect/BirthdaySelect';
import Button from '../../common/button/Button';
import { Input } from '../../common/input/Input';
import { Alert } from '../../common/modal/alert';
import * as St from './style';
import { duplicationCheckFromUserTable } from '../../../api/supabase/users';
import { useQuery } from '@tanstack/react-query';

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
  const [readyBirthday, setReadyBirthday] = useState<boolean>(false);

  const birthday = useBirthdayStore((state) => state.birthday);

  const [validationMsg, setValidationMsg] = useState({
    emailMsg: '',
    nickNameMsg: '',
    pwasswordMsg: '',
    passwordConfirmMsg: '',
    birthdayMsg: '',
  });

  const [validationStatus, setValidationStatus] = useState({
    emailStatus: false,
    nickNameStatus: false,
    passwordStatus: false,
    passwordConfirmStatus: false,
    genderStatus: true,
    birthdayStatus: false,
  });

  const [btnSubmitStatus, setBtnSubmitStatus] = useState(false);

  const { data: isDuplicatedNickname, isError, isLoading } = useQuery(['signUp', 'chkDuplicatedNickname', newUser.nickName], () => duplicationCheckFromUserTable({ columnName: 'nickName', value: newUser.nickName! }), { enabled: !!newUser.nickName });

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setNewUser((prev) => {
      return { ...prev, [name]: value.trim() };
    });

    switch (name) {
      case 'email':
        {
          let msg = '';
          let currentStatus = false;
          if (!validateValue(name, value)) {
            msg = '이메일 형식이 올바르지 않습니다.';
            currentStatus = false;
          } else {
            if (await duplicationCheckFromUserTable({ columnName: name, value })) {
              msg = '이미 사용중인 이메일입니다.';
              currentStatus = false;
            } else {
              msg = '사용가능한 이메일입니다.';
              currentStatus = true;
            }
          }
          setValidationMsg((prev) => ({
            ...prev,
            emailMsg: msg,
          }));
          setValidationStatus((prev) => ({
            ...prev,
            emailStatus: currentStatus,
          }));
        }
        break;
      case 'nickName':
        {
          let msg = '';
          let currentStatus = false;
          if (!validateValue(name, value)) {
            msg = '사용가능한 닉네임이 아닙니다.(특수문자 제외, 2~8자리)';
            currentStatus = false;
          } else {
            if (await duplicationCheckFromUserTable({ columnName: name, value })) {
              msg = '이미 사용중인 닉네임입니다.';
              currentStatus = false;
            } else {
              msg = '사용가능한 닉네임입니다.';
              currentStatus = true;
            }
          }
          setValidationMsg((prev) => ({
            ...prev,
            nickNameMsg: msg,
          }));
          setValidationStatus((prev) => ({
            ...prev,
            nickNameStatus: currentStatus,
          }));
        }
        break;
      case 'password':
        {
          let msg = '';
          let currentStatus = false;
          if (!validateValue(name, value)) {
            msg = '영문 대/소문자 + 숫자 + 특수문자(~?!@#$%^&*_-) 포함 8자이상 15자이하';
            currentStatus = false;
          } else {
            msg = '사용가능한 비밀번호입니다.';
            currentStatus = true;
          }
          setValidationMsg((prev) => ({
            ...prev,
            pwasswordMsg: msg,
          }));
          setValidationStatus((prev) => ({
            ...prev,
            passwordStatus: currentStatus,
          }));
        }
        break;
      case 'passwordConfirm':
        {
          let msg = '';
          let currentStatus = false;
          if (newUser.password !== value) {
            msg = '비밀번호가 일치하지 않습니다.';
            currentStatus = false;
          } else {
            msg = '비밀번호가 일치합니다.';
            currentStatus = true;
          }
          setValidationMsg((prev) => ({
            ...prev,
            passwordConfirmMsg: msg,
          }));
          setValidationStatus((prev) => ({
            ...prev,
            passwordConfirmStatus: currentStatus,
          }));
        }
        break;
      default:
        return;
    }
  };

  const signUpFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
    });

    if (authData) {
      localStorage.setItem('authId', authData.user?.id as string);
    }

    const uid = authData.user?.id;

    const { error: dbUserErr } = await supabase.from('users').insert({
      id: uid,
      email: newUser.email,
      nickName: newUser.nickName,
      gender: newUser.gender,
      birthday,
    });

    if (dbUserErr) return Alert({ title: 'db 에러발생' });
    else {
      Alert({ title: '회원가입이 정상적으로 처리 되었습니다' });
      navigate('/partner');
    }
  };

  // 생년월일 체크
  useEffect(() => {
    if (readyBirthday) {
      if (birthday.length > 0) {
        setValidationMsg((prev) => ({
          ...prev,
          birthdayMsg: '생년월일이 모두 선택되었습니다.',
        }));
        setValidationStatus((prev) => ({
          ...prev,
          birthdayStatus: true,
        }));
      } else if (birthday.length === 0) {
        setValidationMsg((prev) => ({
          ...prev,
          birthdayMsg: '생년월일을 모두 선택해주세요.',
        }));
        setValidationStatus((prev) => ({
          ...prev,
          birthdayStatus: false,
        }));
      }
    }
  }, [readyBirthday, birthday]);

  // 회원가입 버튼 활성화
  useEffect(() => {
    const { emailStatus, nickNameStatus, passwordStatus, passwordConfirmStatus, genderStatus, birthdayStatus } = validationStatus;

    emailStatus && nickNameStatus && passwordStatus && passwordConfirmStatus && genderStatus && birthdayStatus ? setBtnSubmitStatus(false) : setBtnSubmitStatus(true);
  }, [validationStatus]);

  const validateValue = (name: string, value: string) => {
    switch (name) {
      case 'nickName':
        return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/.test(value);
      case 'email':
        return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value);
      case 'password':
        return /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,15}$/.test(value);
      case 'birthday':
        const regex = /^(19[2-9]\d|200[0-5])(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
        return regex.test(value) && /^\d+$/.test(value);
      default:
        return;
    }
  };

  return (
    <St.SignUpSection>
      <St.SignUpLayout>
        <form onSubmit={signUpFn}>
          <St.SignUpInputsBox>
            <St.SignUpTitle>회원가입</St.SignUpTitle>
            <St.FormRow>
              <div>
                <label htmlFor="email" className="label-text">
                  이메일
                </label>
                <Input id="email" name="email" type="email" value={newUser.email} inputStyleType="auth" placeholder="이메일을 입력해주세요." border={true} onChange={onChangeInput} />
              </div>
              <St.ValidationMsgBox $validationStatusColor={validationStatus.emailStatus}>{validationMsg.emailMsg}</St.ValidationMsgBox>
            </St.FormRow>
            <St.FormRow>
              <div>
                <label htmlFor="password" className="label-text">
                  비밀번호
                </label>
                <Input id="password" name="password" type="password" value={newUser.password} inputStyleType="auth" placeholder="비밀번호를 입력해주세요." border={true} onChange={onChangeInput} />
              </div>
              <St.ValidationMsgBox $validationStatusColor={validationStatus.passwordStatus}>{validationMsg.pwasswordMsg}</St.ValidationMsgBox>
            </St.FormRow>
            <St.FormRow>
              <div>
                <label htmlFor="passwordConfirm" className="label-text">
                  비밀번호 재확인
                </label>
                <Input id="passwordConfirm" name="passwordConfirm" type="password" value={newUser.passwordConfirm} inputStyleType="auth" placeholder="비밀번호를 입력해주세요." border={true} onChange={onChangeInput} />
              </div>
              <St.ValidationMsgBox $validationStatusColor={validationStatus.passwordConfirmStatus}>{validationMsg.passwordConfirmMsg}</St.ValidationMsgBox>
            </St.FormRow>
            <St.FormRow>
              <div>
                <label htmlFor="nickName" className="label-text">
                  닉네임
                </label>
                <Input id="nickName" name="nickName" type="text" value={newUser.nickName} inputStyleType="auth" placeholder="닉네임을 입력해주세요." border={true} onChange={onChangeInput} />
              </div>
              <St.ValidationMsgBox $validationStatusColor={validationStatus.nickNameStatus}>{validationMsg.nickNameMsg}</St.ValidationMsgBox>
            </St.FormRow>
            <St.FormRow>
              <St.GenderRow>
                <span className="label-text">성별</span>
                <div className="gender-inputs">
                  <div>
                    <input id="female" type="radio" name="gender" value="여성" checked={newUser.gender === '여성'} onChange={onChangeInput} />
                    <label htmlFor="female">여자</label>
                  </div>
                  <div>
                    <input id="male" type="radio" name="gender" value="남성" checked={newUser.gender === '남성'} onChange={onChangeInput} />
                    <label htmlFor="male">남자</label>
                  </div>
                </div>
              </St.GenderRow>
            </St.FormRow>
            <St.FormRow>
              <label htmlFor="" className="label-text">
                생년월일
              </label>
              <div onFocus={() => setReadyBirthday(true)}>
                <BirthdaySelect />
              </div>
              <St.ValidationMsgBox $validationStatusColor={validationStatus.birthdayStatus}>{validationMsg.birthdayMsg}</St.ValidationMsgBox>
            </St.FormRow>
          </St.SignUpInputsBox>

          <St.BtnSignUpBox>
            <button type="submit" disabled={btnSubmitStatus}>
              가입하기
            </button>
          </St.BtnSignUpBox>
        </form>
      </St.SignUpLayout>
    </St.SignUpSection>
  );
}
