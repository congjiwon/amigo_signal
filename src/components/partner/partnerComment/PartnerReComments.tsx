import { useEffect } from 'react';
import DefaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import { usePartnerComments } from '../../../hooks/usePartnerComment';
import { BtnStyleType } from '../../../types/styleTypes';
import { CommentButton } from '../../common/button/Button';
import { ConfirmDelete } from '../../common/modal/alert';
import * as St from './style';

type CommentProps = {
  content: string;
  date: string;
  id: string;
  postId: string | null;
  writerId: string;
};

type PartnerReCommentsProps = {
  // authId: string | undefined;
  // comment: CommentProps;
  storageUrl: string | undefined;
  reCommentId: string;
  reComment:
    | {
        commentId: string;
        date: string;
        id: string;
        isUpdate: boolean;
        reContent: string;
        writerId: string;
        users: {
          birthday: string;
          gender: string;
          nickName: string;
          profileImageUrl: string | null;
        };
      }
    | null
    | undefined;
  isPostWriter: boolean;
  isLoginCommentUser: boolean;
  isUpdateReComment: boolean;
  updateReComment: string;
  setUpdateReComment: React.Dispatch<React.SetStateAction<string>>;
  handleCancelBtn: (name: string) => void;
  handleIsOpenBtn: (name: string, id: string | null) => void;
  // handleReUpdateBtn: (id: string, isUpdate: boolean) => Promise<void>; 이거다
  handleReSubmitBtn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setIsUpdateReComment: React.Dispatch<React.SetStateAction<boolean>>;
  // handleCancelButton: (isUpdateReComment: boolean) => void;
  // allReCommentsData: {
  //   commentId: string;
  //   date: string;
  //   id: string;
  //   isUpdate: boolean;
  //   reContent: string;
  //   writerId: string;
  //   users: {
  //     birthday: string;
  //     gender: string;
  //     nickName: string;
  //     profileImageUrl: string | null;
  //   };
  // }[];
};

function PartnerReComments({
  // allReCommentsData,
  // authId,
  // comment,
  storageUrl,
  reCommentId,
  reComment,
  isPostWriter,
  isLoginCommentUser,
  isUpdateReComment,
  updateReComment,
  setUpdateReComment,
  handleCancelBtn,
  // handleCancelButton,
  handleIsOpenBtn,
  // handleReUpdateBtn, 이거다
  handleReSubmitBtn,
  setIsUpdateReComment,
}: PartnerReCommentsProps) {
  const { deleteReCommentMutation, updateReCommentMutation } = usePartnerComments();

  // 답댓글 삭제 버튼 클릭
  const handleReDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteReCommentMutation.mutateAsync(id);
    }
  };

  // console.log('1', reCommentId);
  // console.log('2', reComment?.id);

  const handleCancelButton = () => {
    // console.log(isUpdateReComment);
    setIsUpdateReComment(!isUpdateReComment);
  };

  useEffect(() => {
    if (isUpdateReComment) {
      setIsUpdateReComment(false);
    }
  }, [isUpdateReComment]);

  return (
    <St.ReCommentBox>
      <St.CommentTopBox>
        <div>
          <St.Img src={reComment!.users && reComment?.users.profileImageUrl! ? `${storageUrl}/${reComment!.users && reComment?.users.profileImageUrl!}` : DefaultProfileImage} />
        </div>
        <St.WriterContainerBox>
          <St.WriterBox>
            <St.NickNameParagraph>{reComment?.users && reComment.users.nickName}</St.NickNameParagraph>
            {isPostWriter && <St.WriterParagraph>작성자</St.WriterParagraph>}
          </St.WriterBox>
          <St.CommentBox>
            <St.CommentParagraph>{reComment!.reContent}</St.CommentParagraph>
          </St.CommentBox>
        </St.WriterContainerBox>
      </St.CommentTopBox>
      {isLoginCommentUser ? (
        <St.CommentBottomBox>
          <St.DateButtonBox>
            <St.DateBox>
              <St.DateParagraph>{reComment?.date.substring(0, 10) + ' ' + reComment?.date.substring(11, 16)}</St.DateParagraph>
            </St.DateBox>
            <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('updateReComment', reComment!.id)}>
              수정
            </CommentButton>
            <St.Bar>|</St.Bar>
            <CommentButton type="submit" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleReDelBtn(reComment!.id)}>
              삭제
            </CommentButton>
          </St.DateButtonBox>
          {reCommentId === reComment?.id ? (
            <form onSubmit={handleReSubmitBtn}>
              <St.InputBox>
                <St.Textarea placeholder="댓글을 남겨보세요" value={updateReComment} onChange={(event) => setUpdateReComment(event.target.value)} />
                <St.CancelSubmitButtonBox>
                  <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={handleCancelButton}>
                    취소
                  </CommentButton>
                  {/* <St.Bar>|</St.Bar> */}
                  {/* <Button onClick={() => setIsUpdateReComment(false)}>취소</Button> */}
                  <CommentButton type="submit" styleType={BtnStyleType.BTN_ONLYFONT} disabled={updateReComment.length < 1}>
                    등록
                  </CommentButton>
                </St.CancelSubmitButtonBox>
              </St.InputBox>
            </form>
          ) : (
            ''
          )}
        </St.CommentBottomBox>
      ) : (
        <St.CommentBottomBox>
          <St.DateButtonBox>
            <St.DateBox>
              <St.DateParagraph>{reComment?.date.substring(0, 10) + ' ' + reComment?.date.substring(11, 16)}</St.DateParagraph>
            </St.DateBox>
          </St.DateButtonBox>
        </St.CommentBottomBox>
      )}
    </St.ReCommentBox>
  );
}

export default PartnerReComments;
