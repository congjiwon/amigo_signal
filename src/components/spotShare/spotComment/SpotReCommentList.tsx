import DefaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import useSpotComment from '../../../hooks/useSpotComment';
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
  // comment: CommentProps;
  storageUrl: string | undefined;
  reCommentId: string;
  reComment: {
    commentId: string;
    date: string;
    id: string;
    reContent: string;
    writerId: string;
    users: {
      birthday: string;
      email: string;
      gender: string;
      id: string;
      nickName: string;
      profileImageUrl: string | null;
    } | null;
  };
  isPostWriter: boolean;
  isLoginCommentUser: boolean;
  updateReComment: string;
  setUpdateReComment: React.Dispatch<React.SetStateAction<string>>;
  onCancelBtn: (name: string) => void;
  handleIsOpenBtn: (name: string, id: string | null) => void;
  handleReSubmitBtn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setIsUpdateReComment: React.Dispatch<React.SetStateAction<boolean>>;
};

function SpotReCommentList({
  // comment,
  storageUrl,
  reCommentId,
  reComment,
  isPostWriter,
  isLoginCommentUser,
  updateReComment,
  setUpdateReComment,
  onCancelBtn,
  handleIsOpenBtn,
  handleReSubmitBtn,
  setIsUpdateReComment,
}: PartnerReCommentsProps) {
  const { deleteReCommentMutation, updateReCommentMutation } = useSpotComment();

  // 답댓글 삭제 버튼 클릭 >> 잘됨
  const handleReDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      await deleteReCommentMutation.mutateAsync(id);
    }
  };

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
          {/* 의미가 있을려면 isUpdateReComment */}
          {reCommentId === reComment?.id ? (
            <form onSubmit={handleReSubmitBtn}>
              <St.InputBox>
                <St.Textarea placeholder="댓글을 남겨보세요" value={updateReComment} onChange={(event) => setUpdateReComment(event.target.value)} />
                <St.CancelSubmitButtonBox>
                  <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => onCancelBtn('reCommentUpdateCancelBtn')}>
                    취소
                  </CommentButton>
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

export default SpotReCommentList;