import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getPartnerPost, getReCommentData, getReCommentWriterIds, getWriterIds } from '../../../api/supabase/partner';
import { getAuthId, getUsers } from '../../../api/supabase/users';
import { usePartnerComments } from '../../../hooks/usePartnerComment';
import { BtnStyleType } from '../../../types/styleTypes';
import useCurrentUserStore from '../../../zustand/currentUser';
import { CommentButton } from '../../common/button/Button';
import { ConfirmDelete } from '../../common/modal/alert';
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
  | null;

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
  // params : 게시글 ID
  const params = useParams();
  const { postid } = useParams<string>();
  const queryClient = useQueryClient();
  const [isUpdate, setIsUpdate] = useState(false);
  // const [updateComment, setUpdateComment] = useState(comment?.content);
  const [updateComment, setUpdateComment] = useState('');
  const [isReComment, setIsReComment] = useState(false);
  const [reContent, setReContent] = useState('');
  const [isUpdateReComment, setIsUpdateReComment] = useState(false); // true여도 안되네네
  // const [isUpdateReComment2, setIsUpdateReComment2] = useState(false);
  const [updateReComment, setUpdateReComment] = useState('');
  const [reCommentId, setReCommentId] = useState('');

  const { updateCommentMutation, deleteCommentMutation, postReCommentMutation, updateReCommentMutation, deleteReCommentMutation } = usePartnerComments();

  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const { isLoading, data: authId } = useQuery(['auth'], getAuthId);
  const { data: partnerPost } = useQuery(['partnerPost', postid], () => getPartnerPost({ postId: postid as string }));
  const postWriterId = partnerPost?.data?.writerId;

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
      // date: currentTime(), 수정시간넣으면 정렬 이상해짐.
      writerId: comment?.writerId,
      postId: comment?.postId!,
      id: comment?.id,
    };

    await updateCommentMutation.mutateAsync(newComment);

    setUpdateComment('');
    setIsUpdate(false);
  };

  // 답댓글 수정 submit
  const handleReSubmitBtn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReComment = {
      reContent: updateReComment,
      writerId: authId,
      commentId: comment?.id,
      id: reCommentId,
      isUpdate: false,
      date: comment?.date,
    };

    updateReCommentMutation.mutate(newReComment);

    setUpdateReComment('');
    setIsUpdateReComment(false);
  };

  // 답댓글 submit
  const handleReCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reComment = {
      reContent: reContent,
      date: currentTime(),
      writerId: authId,
      commentId: comment!.id,
      isUpdate: false,
    };

    postReCommentMutation.mutateAsync(reComment);

    setReContent('');
    setIsReComment(false);
  };

  // 댓글 수정 버튼 여기로
  const handleUpdateBtn = (id: string) => {
    // setIsUpdate(true);
    // const commentToEdit = allComments!.find((comment) => comment.id === id);
    // if (commentToEdit) {
    //   setUpdateComment(commentToEdit.content);
    // }
  };
  // 답댓글 삭제 버튼 클릭
  const handleReDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteReCommentMutation.mutateAsync(id);
    }
  };

  /// 댓글 삭제 버튼
  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteCommentMutation.mutateAsync(id);
    }
  };

  // 유저 ID, 닉네임, 프로필사진 배열
  const { data: users } = useQuery(['userData'], getUsers);

  // 댓글 작성자 ID 배열
  const { data: writerId } = useQuery(['writerId'], getWriterIds);
  // 답댓글 작성자 ID 배열
  const { data: reCommentIds } = useQuery(['reCommentId'], getReCommentWriterIds);
  // 댓글 작성자의 유저 ID, 닉네임, 프로필사진 배열
  const user = users?.filter((user) => {
    return writerId?.filter((id) => {
      return user.id === id.writerId;
    });
  });

  // 답글쓰기 버튼
  const handleRecommentBtn = () => {
    // setIsReComment(true);
  };

  // 답글 수정 버튼 이거다
  // const handleReUpdateBtn = async (id: string, isUpdate: boolean) => {
  //   const reCommentToEdit = allReCommentsData!.find((reComment) => reComment.id === id);
  //   // isUpdate = true;
  //   // setReCommentId(id);
  //   // setUpdateReComment(reCommentToEdit!.reContent);
  //   // isUpdate = true;
  //   // // console.log(isUpdate);
  //   if (reCommentToEdit) {
  //     setIsUpdateReComment(true);
  //     // isUpdate = true;
  //     setReCommentId(id); // 수정할 게시글 아이디 담아서 보내야함.
  //     setUpdateReComment(reCommentToEdit.reContent); // 수정 클릭 시 초기값으로 원댓글 넣어줌.
  //   }
  // };

  // textarea open 관리

  const handleIsOpenBtn = (name: string, id: string | null, isUpdate: boolean | null) => {
    // 답글쓰기 버튼
    if (name === 'postReComment') {
      setIsReComment(true);
      setIsUpdate(false);
      setIsUpdateReComment(false);
      // 댓글 수정 버튼
    } else if (name === 'updateComment') {
      setIsUpdate(true);
      setIsReComment(false);
      setIsUpdateReComment(false);
      const commentToEdit = allComments!.find((comment) => comment.id === id);

      if (commentToEdit) {
        setUpdateComment(commentToEdit.content);
      }
      // 답댓글 수정 버튼
    } else if (name === 'updateReComment') {
      const reCommentToEdit = allReCommentsData!.find((reComment) => reComment.id === id);
      // isUpdate = true;
      // setReCommentId(id);
      // setUpdateReComment(reCommentToEdit!.reContent);
      // isUpdate = true;
      // // console.log(isUpdate);

      if (reCommentToEdit) {
        isUpdate = true;
        setReCommentId(id!); // 수정할 게시글 아이디 담아서 보내야함.
        setUpdateReComment(reCommentToEdit.reContent); // 수정 클릭 시 초기값으로 원댓글 넣어줌.
        setIsUpdateReComment(true);
        setIsUpdate(false);
        setIsReComment(false);
      }
    }
  };

  // 취소버튼
  const handleCancelBtn = (name: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (name === 'reCommentUpdateCancelBtn') {
      setIsUpdateReComment(false);
    } else if (name === 'updateCancel') {
      setIsUpdate(false);
    } else if ('reCommentCancel') {
      setReContent('');
      setIsReComment(false);
    }
  };

  {
    return (
      <St.PartnerCommentsContainerBox>
        <St.PartnerCommentsBox>
          {/* user : 댓글 작성자의 유저 ID, 닉네임, 프로필사진 배열 */}
          {user?.map((user) => {
            if (user.id === comment?.writerId) {
              const isPostWriter = comment.writerId === postWriterId;
              return (
                <St.CommentTopBox key={user.id}>
                  <div>
                    <St.Img src={user && user.profileImageUrl!} />
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
          {isLoginUser ? (
            <St.CommentBottomBox>
              <St.DateButtonBox>
                <St.DateBox>
                  <St.DateParagraph>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</St.DateParagraph>
                </St.DateBox>
                <div>
                  <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('updateComment', comment!.id, isUpdate)}>
                    수정
                  </CommentButton>
                </div>
                <St.Bar>|</St.Bar>
                <div>
                  <CommentButton type="submit" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleDelBtn(comment!.id)}>
                    삭제
                  </CommentButton>
                  <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('postReComment', comment!.id, isUpdate)}>
                    답글쓰기
                  </CommentButton>
                </div>
              </St.DateButtonBox>
              {isUpdate && (
                <div>
                  <form onSubmit={handleSubmitBtn}>
                    <St.InputBox>
                      <St.Textarea placeholder="댓글을 남겨보세요" value={updateComment} onChange={(event) => setUpdateComment(event.target.value)} />
                      <St.CancelSubmitButtonBox>
                        <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={(e) => handleCancelBtn('updateCancel', e)}>
                          취소
                        </CommentButton>
                        <St.Bar>|</St.Bar>
                        <CommentButton type="submit" disabled={updateComment.length < 1} styleType={BtnStyleType.BTN_ONLYFONT}>
                          등록
                        </CommentButton>
                      </St.CancelSubmitButtonBox>
                    </St.InputBox>
                  </form>
                </div>
              )}
            </St.CommentBottomBox>
          ) : (
            ''
          )}
          {!isLoginUser && user ? (
            <St.CommentBottomBox>
              <St.DateButtonBox>
                <St.DateBox>
                  <St.DateParagraph>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</St.DateParagraph>
                </St.DateBox>{' '}
                <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('postReComment', comment!.id, isUpdate)}>
                  답글쓰기
                </CommentButton>
              </St.DateButtonBox>
            </St.CommentBottomBox>
          ) : (
            ''
          )}
          {isReComment && (
            <St.CommentBottomBox>
              <form onSubmit={handleReCommentSubmit}>
                <St.InputBox>
                  <St.Textarea placeholder="댓글을 입력하세요" value={reContent} onChange={(event) => setReContent(event?.target.value)} />
                  <St.CancelSubmitButtonBox>
                    <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={(e) => handleCancelBtn('reCommentCancel', e)}>
                      취소
                    </CommentButton>
                    <St.Bar>|</St.Bar>
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
              const isPostWriter = reComment.writerId === postWriterId;
              const isLoginCommentUser = authId === reComment.writerId;
              return (
                <PartnerReComments
                  allReCommentsData={allReCommentsData}
                  authId={authId}
                  comment={comment}
                  reComment={reComment}
                  handleCancelBtn={handleCancelBtn}
                  handleIsOpenBtn={handleIsOpenBtn}
                  // handleReUpdateBtn={handleReUpdateBtn} 이거다
                  handleReSubmitBtn={handleReSubmitBtn}
                  isPostWriter={isPostWriter}
                  isLoginCommentUser={isLoginCommentUser}
                  isUpdateReComment={isUpdateReComment}
                  updateReComment={updateReComment}
                  setUpdateReComment={setUpdateReComment}
                  // isUpdateReComment2={isUpdateReComment2}
                  // setIsUpdateReComment2={setIsUpdateReComment2}
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
