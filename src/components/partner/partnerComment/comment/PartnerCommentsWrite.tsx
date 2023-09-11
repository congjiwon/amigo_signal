import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getAuthId } from '../../../../api/supabase/users';
import useSessionStore from '../../../../zustand/store';
import { currentTime } from '../../../common/currentTime/CurrentTime';
import * as St from '../style';
import { usePartnerComments } from '../usePartnerComment';

function PartnerCommentsWrite() {
  const params = useParams();
  const [content, setContent] = useState('');
  const { isLoading, data: authId } = useQuery(['auth'], getAuthId);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const { postCommentMutation } = usePartnerComments();
  // 항상 뜸
  if (isLoading) {
    // console.log('로딩중');
  }

  const handlePostContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value.replace(/ /g, '\u00A0'));
  };

  const handleSubmitBtnClick = (event: React.FormEvent<HTMLFormElement>) => {
    if (content.trim() === '') {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const newComment = {
      content: content,
      date: currentTime(),
      writerId: authId,
      postId: params.postid,
    };
    postCommentMutation.mutate(newComment);
    setContent('');
  };
  return (
    <>
      {logInUserId && (
        <St.Form onSubmit={handleSubmitBtnClick}>
          <St.CommentTextarea name="content" placeholder="댓글을 남겨보세요" value={content} onChange={handlePostContent} maxLength={300} />
          <St.CommentButton type="submit" disabled={content.length < 1}>
            등록
          </St.CommentButton>
        </St.Form>
      )}
    </>
  );
}
export default PartnerCommentsWrite;
