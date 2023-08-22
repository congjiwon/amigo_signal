import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { styled } from 'styled-components';
import { BtnStyleType } from '../../types/styleTypes';
import Button from '../common/button/Button';
import { postPartnerComment } from './Partner';

function PartnerCommentsWrite() {
  const [content, setContent] = useState('');
  const now = new Date();

  const Timestamptz = now.toISOString(); // ISO 8601 형식으로 변환

  const initialValue = {
    content: '',
    date: Timestamptz,
    // 작성글 & 로그인 연동 안된 상태라서 fk 삭제하고 테스트 중
    // writerId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
    // postId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeef',
  };

  const [inputValue, setInputValue] = useState(initialValue);
  const queryKey = ['partnerComments'];
  const queryClient = useQueryClient();
  const mutation = useMutation(postPartnerComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      setContent('');
    },
  });

  const handleSubmitBtnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue({ ...inputValue, content, date: Timestamptz });
    mutation.mutate(inputValue);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 아래 setInputValue 여기서 content뒤에 e.~ 안쓰면 물음표(?) 여러개써도 1개 덜들어감.
    setInputValue({ ...inputValue, content: e.target.value });
    setContent(e.target.value);
  };

  return (
    <>
      <Form onSubmit={handleSubmitBtnClick}>
        <Input type="text" name="content" placeholder="content" value={content} onChange={handleCommentChange} />
        <Button type="submit" styleType={BtnStyleType.BTN_DARK}>
          댓글 등록
        </Button>
      </Form>
    </>
  );
}

export default PartnerCommentsWrite;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 70%;

  margin-top: 20px;
  padding: 10px;

  border: 1px solid #ccc;
  border-radius: 5px;
`;
