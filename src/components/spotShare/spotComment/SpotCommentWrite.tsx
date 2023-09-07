import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getAuthId } from '../../../api/supabase/users';
import useSessionStore from '../../../zustand/store';
import * as St from './style';
import useSpotComment from './useSpotComment';

function SpotWrite() {
  const { postid } = useParams<string>();
  const [content, setContent] = useState('');
  const { isLoading, data: authId } = useQuery(['auth'], getAuthId);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const { postCommentMutation } = useSpotComment();
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
      writerId: authId!,
      postId: postid,
    };
    postCommentMutation.mutate(newComment);
    setContent('');
  };
  return (
    <>
      {logInUserId && (
        <St.Form onSubmit={handleSubmitBtnClick}>
          <St.CommentTextarea name="content" placeholder="댓글을 남겨보세요" value={content} onChange={(e) => setContent(e.target.value)} />
          <St.CommentButton type="submit" disabled={content.length < 1}>
            등록
          </St.CommentButton>
        </St.Form>
      )}
    </>
  );
}
export default SpotWrite;
