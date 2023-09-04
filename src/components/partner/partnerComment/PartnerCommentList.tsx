import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getPartnerPost, getReCommentData } from '../../../api/supabase/partner';
import { getAuthId, getUsers } from '../../../api/supabase/users';
import DefaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import { usePartnerComments } from '../../../hooks/usePartnerComment';
import { BtnStyleType } from '../../../types/styleTypes';
import useCurrentUserStore from '../../../zustand/currentUser';
import useSessionStore from '../../../zustand/store';
import { CommentButton } from '../../common/button/Button';
import { ConfirmDelete } from '../../common/modal/alert';
import TopButton from '../../common/topbutton/TopButton';
import PartnerReComments from './PartnerReComments';
import * as St from './style';

type allCommentsProps =
  | {
      content: string;
      date: string;
      id: string;
      postId: string;
      writerId: string;
    }[]
  | null
  | undefined;

type CommentProps = {
  content: string;
  date: string;
  id: string;
  postId: string | null;
  writerId: string;
};

export type PartnerCommentListProps = {
  allComments: allCommentsProps;
  comment: CommentProps | undefined;
  isLoginUser: boolean;
};

function PartnerCommentList({ allComments, comment, isLoginUser }: PartnerCommentListProps) {
  const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const { postid } = useParams<string>();
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const [isUpdate, setIsUpdate] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [isReComment, setIsReComment] = useState('');
  const [reContent, setReContent] = useState('');
  const [isUpdateReComment, setIsUpdateReComment] = useState(false); // true여도 안되네
  const [updateReComment, setUpdateReComment] = useState('');
  const [reCommentId, setReCommentId] = useState('');

  // 유저 ID, 닉네임, 프로필사진 배열
  const { data: users } = useQuery(['userData'], getUsers);

  const { updateCommentMutation, deleteCommentMutation, postReCommentMutation, updateReCommentMutation } = usePartnerComments();

  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const { isLoading, data: authId } = useQuery(['auth'], getAuthId);
  const { data: partnerPost } = useQuery(['partnerPost', postid], () => getPartnerPost({ postId: postid as string }));
  // 게시글 작성자 찾기
  const postWriterId = partnerPost?.writerId;

  const { data: allReCommentsData } = useQuery(['partnerReComments'], getReCommentData);
  // 답댓글 작성한 모든 유저 정보
  const reCommentUsers = allReCommentsData?.map((user) => {
    return user.users;
  });

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

  // 댓글 수정 submit
  const handleSubmitBtn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      content: updateComment,
      writerId: comment?.writerId,
      postId: comment?.postId!,
      id: comment?.id,
    };

    await updateCommentMutation.mutateAsync(newComment);

    setUpdateComment('');
    setIsUpdate('');
  };

  // 답댓글 수정 submit
  const handleReSubmitBtn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReComment = {
      reContent: updateReComment,
      writerId: authId,
      commentId: comment?.id,
      id: reCommentId,
    };

    updateReCommentMutation.mutate(newReComment);

    setUpdateReComment('');
    setIsUpdateReComment(false);
    setReCommentId('');
  };

  // 답댓글 submit
  const handleReCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reComment = {
      reContent: reContent,
      date: currentTime(),
      writerId: authId,
      commentId: comment!.id,
    };

    postReCommentMutation.mutateAsync(reComment);

    setReContent('');
    setIsReComment('');
  };

  /// 댓글 삭제 버튼
  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteCommentMutation.mutateAsync(id);
    }
  };

  const handleIsOpenBtn = (name: string, commentId: string, reCommentId: string | null) => {
    // 답글쓰기 버튼
    if (name === 'postReComment') {
      setIsReComment(commentId);
      setIsUpdate('');
      setReCommentId('');

      // 댓글 수정 버튼
    } else if (name === 'updateComment') {
      setIsUpdate(commentId);
      setIsReComment('');
      setReCommentId('');

      const commentToEdit = allComments!.find((comment) => comment.id === commentId);

      if (commentToEdit) {
        setUpdateComment(commentToEdit.content);
      }
      // 답댓글 수정 버튼
    } else if (name === 'updateReComment') {
      const reCommentToEdit = allReCommentsData!.find((reComment) => reComment.id === reCommentId);
      if (reCommentToEdit) {
        setReCommentId(reCommentId!); // 수정할 게시글 아이디 담아서 보내야함.
        setUpdateReComment(reCommentToEdit.reContent); // 수정 클릭 시 초기값으로 원댓글 넣어줌.
        setIsUpdate('');
        setIsReComment('');
      }
    }
  };

  // 취소버튼
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

  {
    return (
      <St.PartnerCommentsContainerBox>
        <St.MoveButtonArea>
          <TopButton />
        </St.MoveButtonArea>
        <St.PartnerCommentsBox>
          {/* users : 모든 유저 ID, 닉네임, 프로필사진 배열 */}
          {users?.map((user) => {
            if (user.id === comment?.writerId) {
              const isPostWriter = comment.writerId === postWriterId;
              return (
                // 여기서 user ? 아래 넣고 : 아니면 넣고 이렇게 해야겠는데?
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
                  <St.DateParagraph>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</St.DateParagraph>
                </St.DateBox>
                {/* 여기 작성자태그코드 넣어보기 */}
                {isLoginUser && (
                  <St.ButtonBox>
                    <div>
                      <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('updateComment', comment!.id, null)}>
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
                <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('postReComment', comment!.id, null)}>
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
                    {/* <St.Bar>|</St.Bar> */}
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
          {/* allReCommentsData : 모든 답댓글 정보(유저포함) */}
          {allReCommentsData?.map((reComment) => {
            if (reComment.commentId === comment?.id) {
              const isPostWriter = reComment.writerId === postWriterId; // 작성자 태그 띄울 때 씀.
              const isLoginCommentUser = authId === reComment.writerId; // 로그인한 댓글작성자
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
                  isUpdateReComment={isUpdateReComment}
                  updateReComment={updateReComment}
                  setUpdateReComment={setUpdateReComment}
                  setIsUpdateReComment={setIsUpdateReComment}
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
