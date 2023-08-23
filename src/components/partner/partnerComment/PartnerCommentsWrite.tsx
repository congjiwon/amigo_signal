import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { postPartnerComment } from '../../../api/supabase/partner';
import { getAuthId } from '../../../api/supabase/users';
import { BtnStyleType } from '../../../types/styleTypes';
import Button from '../../common/button/Button';

type PartnerCommentWriteProps = {
  initialComment?: {
    content: string;
  };
};

// type Comment = {
//   comment: TPartnerInsert;
// };

// function PartnerCommentsWrite({ initialComment }: PartnerCommentWriteProps) {
//   const [content, setContent] = useState(initialComment ? initialComment.content : '');
function PartnerCommentsWrite() {
  const params = useParams();
  const [content, setContent] = useState('');
  const queryKey = ['partnerComments2'];
  const { isLoading, data: authId } = useQuery(queryKey, getAuthId);

  const queryClient = useQueryClient();
  const mutation = useMutation(postPartnerComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      console.log('외않되');
      setContent(''); // 얘도 안먹음.. 왜지?
    },
  });

  // 항상 뜸
  if (isLoading) {
    // console.log('로딩중');
  }

  // const [inputContent, setInputContent] = useState(prevComment);
  const now = new Date();

  const Timestamptz = now.toISOString(); // ISO 8601 형식으로 변환

  // const initialValue = {
  //   content: '',
  //   date: Timestamptz,
  //   // 작성글 & 로그인 연동 안된 상태라서 fk 삭제하고 테스트 중
  //   writerId: authId,
  //   // postId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeef',
  // };

  // const [inputValue, setInputValue] = useState(initialValue);
  // const [inputValue, setInputValue] = useState(prevComment ? { ...initialValue, content: prevComment } : initialValue);
  // const queryClient = useQueryClient();
  // const mutation = useMutation(postPartnerComment, {
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries(queryKey);
  //     setInputContent('');
  //     // 이전값 있으면 띄우기위해서 리셋?
  //     setInputValue({ ...inputValue, content: '' });
  //   },
  // });

  const handleSubmitBtnClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = {
      content: content,
      date: Timestamptz,
      writerId: authId,
      postId: params.postid,
    };
    // postPartnerComment(comment);
    mutation.mutate(comment);
  };

  // setInputValue({ ...inputValue, content: prevComment, date: Timestamptz });
  // mutation.mutate(inputValue); 일단 주석

  // const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log('작성버튼성공');
  // 아래 setInputValue 여기서 content뒤에 e.~ 안쓰면 물음표(?) 여러개써도 1개 덜들어감.
  // setInputValue({ ...inputValue, content: e.target.value });
  // setInputContent(e.target.value);
  // console.log('inputContent', inputContent);
  // console.log('content', content);
  // console.log('inputValue', inputValue);
  // };

  return (
    <>
      <Form onSubmit={handleSubmitBtnClick}>
        {/* value에다가  {initialComment ? initialComment.content : content} 이거 넣으면 */}
        {/* input 입력이 안됨. 안보이는데 마지막입력값으로 들어가긴함 */}
        {/* 근데 난 수정눌렀을 땐 이전 입력값을 받아와야만함 */}
        <Input type="text" name="content" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
        {/* {prevComment ? prevComment.content : content} */}
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
