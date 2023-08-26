import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { getAuthId } from '../../../api/supabase/users';
import { usePartnerComments } from '../../../hooks/usePartnerComment';
import { BtnStyleType } from '../../../types/styleTypes';
import Button from '../../common/button/Button';

function PartnerCommentsWrite() {
  const params = useParams();
  const [content, setContent] = useState('');
  const { isLoading, data: authId } = useQuery(['auth'], getAuthId);

  const { postCommentMutation } = usePartnerComments();

  // 항상 뜸
  if (isLoading) {
    // console.log('로딩중');
  }

  // 지원님 시간 가져옴.
  const currentTime = function () {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
    const now = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return now;
  };

  const handleSubmitBtnClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      content: content,
      date: currentTime(),
      writerId: authId,
      postId: params.postid,
    };

    postCommentMutation.mutateAsync(newComment);

    setContent('');
  };

  return (
    <>
      <Form onSubmit={handleSubmitBtnClick}>
        <Input type="text" name="content" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type="submit" styleType={BtnStyleType.BTN_DARK} disabled={content.length < 1}>
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
  width: 1240px;
  height: 56px;

  margin-top: 20px;
  margin-bottom: 25px;
  padding: 10px;

  border-radius: 15px;
  border: 1px solid lightgray;
`;
