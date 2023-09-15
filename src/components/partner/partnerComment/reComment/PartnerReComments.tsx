import DefaultProfileImage from '../../../../assets/imgs/users/default_profile_img.png';
import { BtnStyleType } from '../../../../types/styleTypes';
import { CommentButton } from '../../../common/button/Button';
import { ConfirmDelete } from '../../../common/modal/alert';
import * as St from '../style';
import { PartnerReCommentsProps } from '../type/CommentType';
import { usePartnerComments } from '../usePartnerComment';

function PartnerReComments({ comment, storageUrl, reCommentId, reComment, isPostWriter, isLoginCommentUser, updateReComment, setUpdateReComment, handleCancelBtn, handleIsOpenBtn, handleReSubmitBtn }: PartnerReCommentsProps) {
  const { deleteReCommentMutation } = usePartnerComments();

  const handleUpdateReComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateReComment(event.target.value.replace(/ /g, '\u00A0'));
  };

  const handleReDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      deleteReCommentMutation.mutate(id);
    }
  };

  return (
    <St.ReCommentBox>
      <St.CommentTopBox>
        <div>
          <St.Img src={reComment!.users && reComment?.users.profileImageUrl! ? `${storageUrl}/${reComment!.users && reComment?.users.profileImageUrl!}` : DefaultProfileImage} alt={`${reComment?.users.nickName}님 프로필 이미지`} />
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
            <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('updateReComment', comment.id, reComment!.id)}>
              수정
            </CommentButton>
            <St.Bar>|</St.Bar>
            <CommentButton type="submit" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleReDelBtn(reComment!.id)}>
              삭제
            </CommentButton>
          </St.DateButtonBox>
          {reCommentId === reComment?.id ? (
            <form onSubmit={handleReSubmitBtn}>
              <St.ReCommentInputBox>
                <St.Textarea placeholder="댓글을 남겨보세요" value={updateReComment} onChange={handleUpdateReComment} maxLength={300} />
                <St.CancelSubmitButtonBox>
                  <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleCancelBtn('reCommentUpdateCancelBtn')}>
                    취소
                  </CommentButton>
                  <CommentButton type="submit" styleType={BtnStyleType.BTN_SUBMITCOMMENT}>
                    등록
                  </CommentButton>
                </St.CancelSubmitButtonBox>
              </St.ReCommentInputBox>
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
