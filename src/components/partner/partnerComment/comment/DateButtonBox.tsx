import { BtnStyleType } from '../../../../types/styleTypes';
import { CommentButton } from '../../../common/button/Button';
import { ConfirmDelete } from '../../../common/modal/alert';
import * as St from '../style';
import { DateButtonBoxProps } from '../type/CommentType';
import { usePartnerComments } from '../usePartnerComment';

function DateButtonBox({ comment, isLoginUser, handleIsOpenBtn }: DateButtonBoxProps) {
  const { deleteCommentMutation } = usePartnerComments();

  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('');

    if (isConfirmed) {
      deleteCommentMutation.mutate(id);
    }
  };

  return (
    <St.DateButtonBox>
      {' '}
      <St.DateBox>
        <St.DateParagraph>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</St.DateParagraph>
      </St.DateBox>
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
  );
}

export default DateButtonBox;
