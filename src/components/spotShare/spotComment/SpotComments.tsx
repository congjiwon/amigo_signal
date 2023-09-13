import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPostWriterId, getReCommentData, getSpotComments } from '../../../api/supabase/spotshare';
import { getUsers } from '../../../api/supabase/users';
import TopButton from '../../common/topbutton/TopButton';
import SpotCommentList from './comment/SpotCommentList';
import SpotWrite from './comment/SpotCommentWrite';
import * as St from './style';

function SpotComments() {
  const { postid } = useParams<string>();
  const { data: allComments } = useQuery(['spotComments'], getSpotComments);
  const { data: users } = useQuery(['userData'], getUsers);
  const { data: spotPostWriterId } = useQuery(['spotPostId'], getPostWriterId);
  const findCommentId = spotPostWriterId?.filter((comment) => {
    return comment.id === postid;
  });
  const filteredPostId = findCommentId && findCommentId[0] && findCommentId[0].id;
  const filteredComments = allComments?.filter((comment) => {
    return comment.postId === filteredPostId;
  });

  const [reCommentCount, setReCommentCount] = useState(0);
  const { data: reCommentsData } = useQuery(['spotReComments'], getReCommentData);
  useEffect(() => {
    const reCommentCountForPost =
      reCommentsData?.filter((reComment) => {
        const parentComment = filteredComments?.find((comment) => comment.id === reComment.commentId);
        return parentComment;
      }).length || 0;

    setReCommentCount(reCommentCountForPost);
  }, [reCommentsData, filteredComments]);

  const commentsCount = (filteredComments?.length || 0) + reCommentCount;

  return (
    <>
      <St.CommentLengthBox>
        <St.CommentLengthParagraph>댓글 {commentsCount}개</St.CommentLengthParagraph>
      </St.CommentLengthBox>
      <SpotWrite />
      {filteredComments &&
        filteredComments.map((comment) => {
          const isLoginUser = localStorage.getItem('authId') === comment.writerId;
          return <SpotCommentList key={comment.id} users={users} allComments={allComments} comment={comment} isLoginUser={isLoginUser!} allReCommentsData={reCommentsData} />;
        })}
      <St.MoveButtonArea>
        <TopButton />
      </St.MoveButtonArea>
    </>
  );
}

export default SpotComments;
