import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPartnerPost } from '../../../../api/supabase/partner';
import useSessionStore from '../../../../zustand/store';
import TopButton from '../../../common/topbutton/TopButton';
import PartnerReComments from '../reComment/PartnerReComments';
import * as St from '../style';
import { PartnerCommentListProps } from '../type/CommentType';
import { usePartnerComments } from '../usePartnerComment';
import CancelSubmitBox from './CancelSubmitBox';
import CommentTopBox from './CommentTopBox';
import DateButtonBox from './DateButtonBox';

function PartnerCommentList({ allComments, allReCommentsData, comment, isLoginUser, users }: PartnerCommentListProps) {
  const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const [isUpdate, setIsUpdate] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [isReComment, setIsReComment] = useState('');
  const [reContent, setReContent] = useState('');
  const [isUpdateReComment, setIsUpdateReComment] = useState(false);
  const [updateReComment, setUpdateReComment] = useState('');
  const [reCommentId, setReCommentId] = useState('');

  const { updateCommentMutation, postReCommentMutation, updateReCommentMutation } = usePartnerComments();
  const { data: partnerPost } = useQuery(['partnerPost', comment?.postId], () => getPartnerPost({ postId: comment?.postId! }));
  const postWriterId = partnerPost?.writerId;

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

  const handleSubmitBtn = (event: React.FormEvent<HTMLFormElement>) => {
    if (updateComment.trim() === '') {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const newComment = {
      content: updateComment,
      writerId: comment?.writerId,
      postId: comment?.postId!,
      id: comment?.id,
    };

    updateCommentMutation.mutate(newComment);

    setUpdateComment('');
    setIsUpdate('');
  };

  const handleReSubmitBtn = (event: React.FormEvent<HTMLFormElement>) => {
    if (updateReComment.trim() === '') {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const newReComment = {
      reContent: updateReComment,
      writerId: logInUserId,
      commentId: comment?.id,
      id: reCommentId,
    };

    updateReCommentMutation.mutate(newReComment);

    setUpdateReComment('');
    setIsUpdateReComment(false);
    setReCommentId('');
  };

  const handleReCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (reContent.trim() === '') {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const reComment = {
      reContent: reContent,
      date: currentTime(),
      writerId: logInUserId,
      commentId: comment!.id,
    };

    postReCommentMutation.mutate(reComment);

    setReContent('');
    setIsReComment('');
  };

  const handleIsOpenBtn = (name: string, commentId: string, reCommentId: string | null) => {
    if (name === 'postReComment') {
      setIsReComment(commentId);
      setIsUpdate('');
      setReCommentId('');
    } else if (name === 'updateComment') {
      setIsUpdate(commentId);
      setIsReComment('');
      setReCommentId('');

      const commentToEdit = allComments!.find((comment) => comment.id === commentId);

      if (commentToEdit) {
        setUpdateComment(commentToEdit.content);
      }
    } else if (name === 'updateReComment') {
      const reCommentToEdit = allReCommentsData!.find((reComment) => reComment.id === reCommentId);
      if (reCommentToEdit) {
        setReCommentId(reCommentId!);
        setUpdateReComment(reCommentToEdit.reContent);
        setIsUpdate('');
        setIsReComment('');
      }
    }
  };

  const handleCancelBtn = (name: string) => {
    if (name === 'reCommentUpdateCancelBtn') {
      setReCommentId('');
    } else if (name === 'updateCancel') {
      setIsUpdate('');
    } else if ('reCommentCancel') {
      setReContent('');
      setIsReComment('');
    }
  };

  const handleUpdateComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateComment(event.target.value.replace(/ /g, '\u00A0'));
  };

  const handlePostReContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReContent(event.target.value.replace(/ /g, '\u00A0'));
  };

  {
    return (
      <St.PartnerCommentsContainerBox>
        <St.MoveButtonArea>
          <TopButton />
        </St.MoveButtonArea>
        <St.PartnerCommentsBox>
          {users?.map((user) => {
            if (user.id === comment?.writerId) {
              const isPostWriter = comment.writerId === postWriterId;
              return <CommentTopBox user={user} storageUrl={storageUrl} isPostWriter={isPostWriter} comment={comment} />;
            }
          })}
          {logInUserId ? (
            <St.CommentBottomBox>
              <DateButtonBox comment={comment} isLoginUser={isLoginUser} handleIsOpenBtn={handleIsOpenBtn} />
              {isUpdate && <CancelSubmitBox handleSubmitBtn={handleSubmitBtn} comment={updateComment} handleComment={handleUpdateComment} handleCancelBtn={() => handleCancelBtn('updateCancel')} />}
            </St.CommentBottomBox>
          ) : (
            <St.CommentBottomBox>
              <St.DateButtonBox>
                <St.DateBox>
                  <St.DateParagraph>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</St.DateParagraph>
                </St.DateBox>
              </St.DateButtonBox>
            </St.CommentBottomBox>
          )}
          {isReComment && (
            <St.CommentBottomBox>
              <CancelSubmitBox handleSubmitBtn={handleReCommentSubmit} comment={reContent} handleComment={handlePostReContent} handleCancelBtn={() => handleCancelBtn('reCommentCancel')} />
            </St.CommentBottomBox>
          )}
        </St.PartnerCommentsBox>
        <St.PartnerReCommentsBox>
          {allReCommentsData?.map((reComment) => {
            if (reComment.commentId === comment?.id) {
              const isPostWriter = reComment.writerId === postWriterId;
              const isLoginCommentUser = logInUserId === reComment.writerId;
              return (
                <PartnerReComments
                  key={reComment.id}
                  comment={comment}
                  storageUrl={storageUrl}
                  reCommentId={reCommentId}
                  reComment={reComment}
                  handleCancelBtn={handleCancelBtn}
                  handleIsOpenBtn={handleIsOpenBtn}
                  handleReSubmitBtn={handleReSubmitBtn}
                  isPostWriter={isPostWriter}
                  isLoginCommentUser={isLoginCommentUser}
                  updateReComment={updateReComment}
                  setUpdateReComment={setUpdateReComment}
                />
              );
            }
          })}
        </St.PartnerReCommentsBox>
      </St.PartnerCommentsContainerBox>
    );
  }
}

export default PartnerCommentList;
