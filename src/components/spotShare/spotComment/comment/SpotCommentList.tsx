import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSpotPost } from '../../../../api/supabase/spotshare';
import useSessionStore from '../../../../zustand/store';
import { currentTime } from '../../../common/currentTime/CurrentTime';
import { ConfirmDelete } from '../../../common/modal/alert';
import SpotReCommentList from '../reComment/SpotReCommentList';
import * as St from '../style';
import { SpotCommentListProps } from '../type/CommentType';
import useSpotComment from '../useSpotComment';
import CancelSubmitBox from './CancelSubmitBox';
import CommentTopBox from './CommentTopBox';
import DateButtonBox from './DateButtonBox';

function SpotCommentList({ allComments, allReCommentsData, comment, isLoginUser, users }: SpotCommentListProps) {
  const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState('');
  const [isReComment, setIsReComment] = useState(false);
  const [reContent, setReContent] = useState('');
  const [isUpdateReComment, setIsUpdateReComment] = useState(false);
  const [updateReComment, setUpdateReComment] = useState('');
  const [reCommentId, setReCommentId] = useState('');

  const { updateCommentMutation, deleteCommentMutation, postReCommentMutation, updateReCommentMutation } = useSpotComment();
  const { data: spotPost } = useQuery(['spotPost', comment?.postId], () => getSpotPost({ postId: comment?.postId! }));
  const postWriterId = spotPost?.writerId;

  const handleUpdateComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateComment(event.target.value.replace(/ /g, '\u00A0'));
  };

  const handlePostReContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReContent(event.target.value.replace(/ /g, '\u00A0'));
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
    setIsUpdate(false);
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
    setIsReComment(false);
  };

  const handleReSubmitBtn = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      deleteCommentMutation.mutate(id);
    }
  };

  const handleIsOpenBtn = (name: string, id: string | null) => {
    if (name === 'postReComment') {
      setIsReComment(true);
      setIsUpdate(false);
      setReCommentId('');
    } else if (name === 'updateComment') {
      setIsUpdate(true);
      setIsReComment(false);
      setReCommentId('');
      const commentToEdit = allComments!.find((comment) => comment.id === id);

      if (commentToEdit) {
        setUpdateComment(commentToEdit.content);
      }
    } else if (name === 'updateReComment') {
      const reCommentToEdit = allReCommentsData!.find((reComment) => reComment.id === id);

      if (reCommentToEdit) {
        setReCommentId(id!);
        setUpdateReComment(reCommentToEdit.reContent);
        setIsUpdate(false);
        setIsReComment(false);
      }
    }
  };

  const handleCancelBtn = (name: string) => {
    if (name === 'reCommentUpdateCancelBtn') {
      setReCommentId('');
    } else if (name === 'updateCancel') {
      setIsUpdate(false);
    } else if ('reCommentCancel') {
      setReContent('');
      setIsReComment(false);
    }
  };

  return (
    <St.PartnerCommentsContainerBox>
      <St.PartnerCommentsBox>
        {users?.map((user) => {
          if (user.id === comment?.writerId) {
            const isPostWriter = comment.writerId === postWriterId;
            return <CommentTopBox user={user} storageUrl={storageUrl} isPostWriter={isPostWriter} comment={comment} key={user.id} />;
          }
        })}
        {logInUserId ? (
          <St.CommentBottomBox>
            <DateButtonBox comment={comment} isLoginUser={isLoginUser} handleIsOpenBtn={handleIsOpenBtn} handleDelBtn={handleDelBtn} />
            {isUpdate && <CancelSubmitBox handleSubmitBtn={handleSubmitBtn} comment={updateComment} handleComment={handleUpdateComment} handleCancelBtn={() => handleCancelBtn('updateCancel')} />}
          </St.CommentBottomBox>
        ) : (
          <St.CommentBottomBox>
            <St.DateButtonBox>
              <St.DateBox>
                <St.DateParagraph>{comment!.date!.substring(0, 10) + ' ' + comment!.date!.substring(11, 16)}</St.DateParagraph>
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
              <SpotReCommentList
                key={reComment.id}
                storageUrl={storageUrl}
                reCommentId={reCommentId}
                reComment={reComment}
                onCancelBtn={handleCancelBtn}
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

export default SpotCommentList;
