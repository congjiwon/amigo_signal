import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { getPartnerPost, getReCommentData, getReCommentWriterIds, getWriterIds } from '../../../api/supabase/partner';
import { getAuthId, getUsers } from '../../../api/supabase/users';
import { usePartnerComments } from '../../../hooks/usePartnerComment';
import useCurrentUserStore from '../../../zustand/currentUser';
import { ConfirmDelete } from '../../common/modal/alert';

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
  const [isUpdateReComment, setIsUpdateReComment] = useState(false);
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
      currentDate: currentTime(),
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
      currentDate: currentTime(),
    };

    postReCommentMutation.mutateAsync(reComment);

    setReContent('');
    setIsReComment(false);
  };

  // 댓글 수정 버튼 여기로
  const handleUpdateBtn = (id: string) => {
    setIsUpdate(true);
    const commentToEdit = allComments!.find((comment) => comment.id === id);
    if (commentToEdit) {
      setUpdateComment(commentToEdit.content);
    }
  };
  // 답댓글 삭제 버튼 클릭
  const handleReDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteReCommentMutation.mutateAsync(id);
    } else {
      return;
    }
  };

  /// 댓글 삭제 버튼
  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteCommentMutation.mutateAsync(id);
    } else {
      return;
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
    setIsReComment(true);
  };

  // 답글 수정 버튼
  const handleReUpdateBtn = async (id: string, isUpdate: boolean) => {
    const reCommentToEdit = allReCommentsData!.find((reComment) => reComment.id === id);
    // isUpdate = true;
    // setReCommentId(id);
    // setUpdateReComment(reCommentToEdit!.reContent);
    // isUpdate = true;
    // // console.log(isUpdate);

    if (reCommentToEdit) {
      isUpdate = true;
      setReCommentId(id); // 수정할 게시글 아이디 담아서 보내야함.
      setUpdateReComment(reCommentToEdit.reContent); // 수정 클릭 시 초기값으로 원댓글 넣어줌.
      setIsUpdateReComment(isUpdate);
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
      <PartnerCommentsContainerBox>
        <PartnerCommentsBox>
          {/* user : 댓글 작성자의 유저 ID, 닉네임, 프로필사진 배열 */}
          {user?.map((user) => {
            if (user.id === comment?.writerId) {
              const isPostWriter = comment.writerId === postWriterId;
              return (
                <CommentTopBox key={user.id}>
                  <div>
                    <Img src={user && user.profileImageUrl!} />
                  </div>
                  <WriterContainerBox>
                    <WriterBox>
                      <NickNameParagraph>{user.nickName}</NickNameParagraph>
                      {isPostWriter && <WriterParagraph>작성자</WriterParagraph>}
                    </WriterBox>
                    <CommentBox>
                      <CommentParagraph>{comment?.content}</CommentParagraph>
                    </CommentBox>
                  </WriterContainerBox>
                </CommentTopBox>
              );
            }
          })}
          {isLoginUser ? (
            <CommentBottomBox>
              <DateButtonBox>
                <DateBox>
                  <p>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</p>
                </DateBox>
                <div>
                  <button onClick={() => handleUpdateBtn(comment!.id)}>수정</button>
                </div>
                <div>
                  <button onClick={() => handleDelBtn(comment!.id)}>삭제</button>
                  <button onClick={handleRecommentBtn}>답글쓰기</button>
                </div>
              </DateButtonBox>
              {isUpdate && (
                <div>
                  <form onSubmit={handleSubmitBtn}>
                    <InputBox>
                      <Textarea placeholder="댓글을 남겨보세요" value={updateComment} onChange={(event) => setUpdateComment(event.target.value)} required />
                      <CancelSubmitButtonBox>
                        <Button type="button" onClick={(e) => handleCancelBtn('updateCancel', e)}>
                          취소
                        </Button>
                        <button type="submit">등록</button>
                      </CancelSubmitButtonBox>
                    </InputBox>
                  </form>
                </div>
              )}
            </CommentBottomBox>
          ) : (
            ''
          )}
          {!isLoginUser && (
            <CommentBottomBox>
              <DateButtonBox>
                <DateBox>
                  <DateParagraph>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</DateParagraph>
                </DateBox>{' '}
                <button type="submit" onClick={handleRecommentBtn}>
                  답글쓰기
                </button>
              </DateButtonBox>
            </CommentBottomBox>
          )}
          {isReComment && (
            <CommentBottomBox>
              <form onSubmit={handleReCommentSubmit}>
                <InputBox>
                  <Textarea placeholder="댓글을 입력하세요" value={reContent} onChange={(event) => setReContent(event?.target.value)} />
                  <CancelSubmitButtonBox>
                    <Button type="button" onClick={(e) => handleCancelBtn('reCommentCancel', e)}>
                      취소
                    </Button>
                    <button type="submit">등록</button>
                  </CancelSubmitButtonBox>
                </InputBox>
              </form>
            </CommentBottomBox>
          )}
        </PartnerCommentsBox>
        <PartnerReCommentsBox>
          {/* allReCommentsData : 모든 답댓글 정보(유저포함) */}
          {allReCommentsData?.map((reComment) => {
            if (reComment.commentId === comment?.id) {
              const isPostWriter = reComment.writerId === postWriterId;
              const isLoginCommentUser = authId === reComment.writerId;
              return (
                <ReCommentBox key={reComment.id}>
                  <CommentTopBox>
                    <div>
                      <Img src={reComment.users && reComment.users.profileImageUrl!} />
                    </div>
                    <WriterContainerBox>
                      <WriterBox>
                        <NickNameParagraph>{reComment.users && reComment.users.nickName}</NickNameParagraph>
                        {isPostWriter && <WriterParagraph>작성자</WriterParagraph>}
                      </WriterBox>
                      <CommentBox>
                        <CommentParagraph>{reComment.reContent}</CommentParagraph>
                      </CommentBox>
                    </WriterContainerBox>
                  </CommentTopBox>
                  {isLoginCommentUser && (
                    <CommentBottomBox>
                      <DateButtonBox>
                        <DateBox>
                          <p>{reComment?.currentDate.substring(0, 10) + ' ' + reComment?.currentDate.substring(11, 16)}</p>
                        </DateBox>
                        <button type="button" onClick={() => handleReUpdateBtn(reComment.id, reComment.isUpdate)}>
                          수정
                        </button>
                        {/* <button onClick={() => handleReUpdateBtn(reComment)}>수정</button> */}
                        <button type="submit" onClick={() => handleReDelBtn(reComment.id)}>
                          삭제
                        </button>
                      </DateButtonBox>
                      {/* 모든애들 인풋창 보이게되어있다. */}
                      {/* 테이블에 isopen 상태를 넣는게 좋다. 각각 코멘트에 속성 상태 넣는것도 쉬운 방법 */}
                      {isUpdateReComment && (
                        <form onSubmit={handleReSubmitBtn}>
                          <InputBox>
                            <Textarea placeholder="댓글을 남겨보세요" value={updateReComment} onChange={(event) => setUpdateReComment(event.target.value)} />
                            <CancelSubmitButtonBox>
                              <Button type="button" onClick={(e) => handleCancelBtn('reCommentUpdateCancelBtn', e)}>
                                취소
                              </Button>
                              {/* <Button onClick={() => setIsUpdateReComment(false)}>취소</Button> */}
                              <button type="submit">등록</button>
                            </CancelSubmitButtonBox>
                          </InputBox>
                        </form>
                      )}
                    </CommentBottomBox>
                  )}
                  {!isLoginCommentUser && (
                    <CommentBottomBox>
                      <DateButtonBox>
                        <DateBox>
                          <p>{reComment?.currentDate.substring(0, 10) + ' ' + reComment?.currentDate.substring(11, 16)}</p>
                        </DateBox>
                      </DateButtonBox>
                    </CommentBottomBox>
                  )}
                </ReCommentBox>
              );
            }
          })}
        </PartnerReCommentsBox>
      </PartnerCommentsContainerBox>
    );
  }
}

export default PartnerCommentList;

const PartnerCommentsContainerBox = styled.div``;

const PartnerCommentsBox = styled.div`
  margin-bottom: 24px;

  /* border: 1px solid; */
`;

const CommentTopBox = styled.div`
  display: flex;
`;

const WriterBox = styled.div`
  align-items: center;

  display: flex;

  margin-bottom: 6px;
`;

const NickNameParagraph = styled.p`
  margin-right: 12px;

  font-weight: bold;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;

  margin-right: 12px;

  border-radius: 50px;
`;

const WriterContainerBox = styled.div`
  flex-direction: column;
`;

const CommentBox = styled.div`
  margin-bottom: 6px;
  /* margin-right: 12px; */
`;

const CommentParagraph = styled.p``;

const CommentBottomBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 52px;
`;

const DateButtonBox = styled.div`
  align-items: center;

  display: flex;

  margin-bottom: 24px;
`;

const DateBox = styled.div`
  margin-right: 12px;
`;

const DateParagraph = styled.p``;

const InputBox = styled.div`
  position: relative;
`;

const Textarea = styled.textarea`
  resize: none;

  width: 1220px;
  height: 100px;

  border-radius: 15px;
  border: 1px solid lightgray;
`;

const CancelSubmitButtonBox = styled.div`
  position: absolute;
  top: 62px;
  right: 24px;
`;

const Button = styled.button``;

const WriterParagraph = styled.p`
  text-align: center;
  align-items: center;

  width: 51px;
  height: 23px;

  color: white;
  background-color: gray;

  border-radius: 30px;

  font-size: 12px;
  /* font-style: normal; */
  /* font-weight: 400; */
  line-height: 170%;
`;

const ReCommentBox = styled.div`
  margin-bottom: 24px;
  margin-left: 52px;
  /* border: 1px solid; */
`;

const PartnerReCommentsBox = styled.div`
  /* border: 1px solid; */
`;
