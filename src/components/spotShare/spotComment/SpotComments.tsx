import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPostWriterId, getReCommentData, getSpotComments } from '../../../api/supabase/spotshare';
import TopButton from '../../common/topbutton/TopButton';
import SpotCommentList from './SpotCommentList';
import SpotWrite from './SpotCommentWrite';
import * as St from './style';

function SpotComments() {
  const { postid } = useParams<string>();

  // 모든 댓글(유저정보 포함)
  const { data: allComments } = useQuery(['spotComments'], getSpotComments);

  // 모든 스팟 게시글 작성자 ID
  const { data: spotPostWriterId } = useQuery(['spotPostId'], getPostWriterId);
  // 작성자가 작성한 댓글 찾기(배열의 0번째.id)
  const findCommentId = spotPostWriterId?.filter((comment) => {
    return comment.id === postid;
  });
  const filteredPostId = findCommentId && findCommentId[0] && findCommentId[0].id;
  // 모든 댓글 중 해당 게시글의 댓글 배열
  const filteredComments = allComments?.filter((comment) => {
    // 얘의 갯수랑,,
    return comment.postId === filteredPostId;
  });

  const [reCommentCount, setReCommentCount] = useState(0);
  const { data: reCommentsData } = useQuery(['spotReComments'], getReCommentData);
  useEffect(() => {
    // spotReComments 테이블에서 해당 게시글에 대한 답댓글 수 계산
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
        // filteredIds : 현재 로그인한 유저의 댓글 목록
        filteredComments.map((comment) => {
          const isLoginUser = localStorage.getItem('authId') === comment.writerId;
          return <SpotCommentList key={comment.id} allComments={allComments} comment={comment} isLoginUser={isLoginUser!} />;
        })}
      <St.MoveButtonArea>
        <TopButton />
      </St.MoveButtonArea>
    </>
  );
}

export default SpotComments;
