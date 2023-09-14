import * as St from './style';

export interface InputProps {
  id?: string;
  name?: string;
  type: 'text' | 'textarea' | 'email' | 'password' | 'number';
  $inputStyleType: 'comment' | 'auth' | 'search' | 'write' | 'apply';
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  $border: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  forwardRef?: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  autocomplete?: string;
}

export const Input = ({ id, name, type, $inputStyleType, placeholder, value, onChange, $border, disabled, autoFocus, forwardRef, autocomplete }: InputProps) => {
  if (type === 'textarea') {
    return (
      <St.Textarea
        id={id}
        name={name}
        $inputStyleType={$inputStyleType}
        placeholder={placeholder ?? ''}
        value={value}
        onChange={onChange}
        $border={$border}
        disabled={disabled}
        autoFocus={autoFocus}
        ref={forwardRef as React.MutableRefObject<HTMLTextAreaElement | null>}
        autoComplete={autocomplete ?? 'off'}
      />
    );
  } else {
    return (
      <St.Input
        id={id}
        name={name}
        type={type}
        $inputStyleType={$inputStyleType}
        placeholder={placeholder ?? ''}
        value={value}
        onChange={onChange}
        $border={$border}
        disabled={disabled}
        autoFocus={autoFocus}
        ref={forwardRef as React.MutableRefObject<HTMLInputElement | null>}
        autoComplete={autocomplete ?? 'off'}
      />
    );
  }
};

// 아래는 사용 예시입니다.

// import { Input } from '../components/common/input';

// const Intro = () => {
//   return (
//     <div>
//       <Input type="text" inputStyleType="comment" placeholder="댓글을 입력해주세요." border={true} />
//       <br />
//       <br />
//       <Input type="email" inputStyleType="auth" placeholder="이메일을 입력해주세요." border={false} />
//       <br />
//       <Input type="text" inputStyleType="auth" placeholder="닉네임을 입력해주세요." border={false} />
//       <br />
//       <Input type="password" inputStyleType="auth" placeholder="비밀번호를 입력해주세요." border={false} />
//       <br />
//       <br />
//       <Input type="text" inputStyleType="search" placeholder="검색어를 입력해주세요." border={true} />
//       <br />
//       <br />
//       <Input type="text" inputStyleType="write" placeholder="원활한 동료찾기를 위해 지역명을 함께 입력해주세요." border={true} />
//       <br />
//       <br />
//       <Input type="textarea" inputStyleType="apply" placeholder="간단한 자기소개를 입력해주세요." border={true} />
//     </div>
//   );
// };

// export default Intro;
