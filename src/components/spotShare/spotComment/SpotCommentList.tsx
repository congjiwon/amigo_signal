import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSpotPost } from '../../../api/supabase/spotshare';
import DefaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import { BtnStyleType } from '../../../types/styleTypes';
import useSessionStore from '../../../zustand/store';
import { CommentButton } from '../../common/button/Button';
import { ConfirmDelete } from '../../common/modal/alert';
import SpotReCommentList from './SpotReCommentList';
import * as St from './style';
import useSpotComment from './useSpotComment';

type AllCommentsProps =
  | {
      content: string;
      id: string;
    }[]
  | null
  | undefined;

type AllReCommentsprops =
  | {
      commentId: string;
      date: string;
      id: string;
      reContent: string;
      writerId: string;
      users: {
        id: string;
        nickName: string;
        profileImageUrl: string | null;
      } | null;
    }[]
  | null
  | undefined;

type CommentProps = {
  content: string;
  date: string | null;
  id: string;
  postId: string | null;
  writerId: string;
};

type UsersProps =
  | {
      id: string;
      nickName: string;
      profileImageUrl: string | null;
    }[]
  | null
  | undefined;

export type PartnerCommentListProps = {
  allComments: AllCommentsProps;
  allReCommentsData: AllReCommentsprops;
  comment?: CommentProps;
  isLoginUser: boolean;
  users: UsersProps;
};

function SpotCommentList({ allComments, allReCommentsData, comment, isLoginUser, users }: PartnerCommentListProps) {
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

  // 댓글 삭제 버튼
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
            return (
              <St.CommentTopBox key={user.id}>
                <div>
                  <St.Img src={user! && user!.profileImageUrl! ? `${storageUrl}/${user!.profileImageUrl!}` : DefaultProfileImage} />
                </div>
                <St.WriterContainerBox>
                  <St.WriterBox>
                    <St.NickNameParagraph>{user.nickName}</St.NickNameParagraph>
                    {isPostWriter && <St.WriterParagraph>작성자</St.WriterParagraph>}
                  </St.WriterBox>
                  <St.CommentBox>
                    <St.CommentParagraph>{comment?.content}</St.CommentParagraph>
                  </St.CommentBox>
                </St.WriterContainerBox>
              </St.CommentTopBox>
            );
          }
        })}
        {logInUserId && (
          <St.CommentBottomBox>
            <St.DateButtonBox>
              {' '}
              <St.DateBox>
                <St.DateParagraph>{comment!.date!.substring(0, 10) + ' ' + comment!.date!.substring(11, 16)}</St.DateParagraph>
              </St.DateBox>
              {isLoginUser && (
                <St.ButtonBox>
                  <div>
                    <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('updateComment', comment!.id)}>
                      수정
                    </CommentButton>
                  </div>
                  <St.Bar>|</St.Bar>
                  <div>
                    <CommentButton type="submit" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleDelBtn(comment!.id)}>
                      삭제
                    </CommentButton>
                  </div>
                </St.ButtonBox>
              )}
              <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('postReComment', comment!.id)}>
                답글쓰기
              </CommentButton>
            </St.DateButtonBox>
            {isUpdate && (
              <div>
                <form onSubmit={handleSubmitBtn}>
                  <St.InputBox>
                    <St.Textarea placeholder="댓글을 남겨보세요" value={updateComment} onChange={(event) => setUpdateComment(event.target.value)} />
                    <St.CancelSubmitButtonBox>
                      <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleCancelBtn('updateCancel')}>
                        취소
                      </CommentButton>
                      <CommentButton type="submit" disabled={updateComment.length < 1} styleType={BtnStyleType.BTN_ONLYFONT}>
                        등록
                      </CommentButton>
                    </St.CancelSubmitButtonBox>
                  </St.InputBox>
                </form>
              </div>
            )}
          </St.CommentBottomBox>
        )}
        {isReComment && (
          <St.CommentBottomBox>
            <form onSubmit={handleReCommentSubmit}>
              <St.InputBox>
                <St.Textarea placeholder="댓글을 입력하세요" value={reContent} onChange={(event) => setReContent(event?.target.value)} />
                <St.CancelSubmitButtonBox>
                  <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleCancelBtn('reCommentCancel')}>
                    취소
                  </CommentButton>
                  <CommentButton type="submit" disabled={reContent.length < 1} styleType={BtnStyleType.BTN_ONLYFONT}>
                    등록
                  </CommentButton>
                </St.CancelSubmitButtonBox>
              </St.InputBox>
            </form>
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
