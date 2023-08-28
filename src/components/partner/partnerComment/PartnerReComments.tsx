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
  authId: string | undefined;
  comment: CommentProps;
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
  handleCancelBtn: (name: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  handleIsOpenBtn: (name: string, id: string | null, isUpdate: boolean | null) => void;
  // handleReUpdateBtn: (id: string, isUpdate: boolean) => Promise<void>; 이거다
  handleReSubmitBtn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  allReCommentsData: {
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
  }[];
};

function PartnerReComments({
  allReCommentsData,
  authId,
  comment,
  reComment,
  isPostWriter,
  isLoginCommentUser,
  isUpdateReComment,
  updateReComment,
  setUpdateReComment,
  handleCancelBtn,
  handleIsOpenBtn,
  // handleReUpdateBtn, 이거다
  handleReSubmitBtn,
}: PartnerReCommentsProps) {
  const { deleteReCommentMutation, updateReCommentMutation } = usePartnerComments();

  // 답댓글 삭제 버튼 클릭
  const handleReDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteReCommentMutation.mutateAsync(id);
    }
  };

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

  return (
    <St.ReCommentBox key={reComment?.id}>
      <St.CommentTopBox>
        <div>
          <St.Img src={reComment!.users && reComment?.users.profileImageUrl!} />
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
      {isLoginCommentUser && (
        <St.CommentBottomBox>
          <St.DateButtonBox>
            <St.DateBox>
              <St.DateParagraph>{reComment?.date.substring(0, 10) + ' ' + reComment?.date.substring(11, 16)}</St.DateParagraph>
            </St.DateBox>
            {/* <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleReSubmitBtn('updateReComment', reComment!.id, reComment!.isUpdate)}> */}
            {/* <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleReUpdateBtn(reComment!.id, reComment!.isUpdate)}> */}
            {/* <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleReUpdateBtn(reComment!.id, reComment!.isUpdate)}> */}
            <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('updateReComment', reComment!.id, reComment!.isUpdate)}>
              수정
            </CommentButton>
            <St.Bar>|</St.Bar>
            {/* <button onClick={() => handleReUpdateBtn(reComment)}>수정</button> */}
            <CommentButton type="submit" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleReDelBtn(reComment!.id)}>
              삭제
            </CommentButton>
          </St.DateButtonBox>
          {/* 모든애들 인풋창 보이게되어있다. */}
          {/* 테이블에 isopen 상태를 넣는게 좋다. 각각 코멘트에 속성 상태 넣는것도 쉬운 방법 */}
          {isUpdateReComment ? (
            <form onSubmit={handleReSubmitBtn}>
              <St.InputBox>
                <St.Textarea placeholder="댓글을 남겨보세요" value={updateReComment} onChange={(event) => setUpdateReComment(event.target.value)} />
                <St.CancelSubmitButtonBox>
                  <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={(e) => handleCancelBtn('reCommentUpdateCancelBtn', e)}>
                    취소
                  </CommentButton>
                  <St.Bar>|</St.Bar>
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
      )}
      {!isLoginCommentUser && (
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
