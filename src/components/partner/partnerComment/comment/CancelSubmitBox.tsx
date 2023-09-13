import { BtnStyleType } from '../../../../types/styleTypes';
import { CommentButton } from '../../../common/button/Button';
import * as St from '../style';
import { CancelSubmitBoxProps } from '../type/CommentType';

function CancelSubmitBox({ handleSubmitBtn, comment, handleComment, handleCancelBtn }: CancelSubmitBoxProps) {
  return (
    <form onSubmit={handleSubmitBtn}>
      <St.InputBox>
        <St.Textarea placeholder="댓글을 남겨보세요" value={comment} onChange={handleComment} maxLength={300} />
        <St.CancelSubmitButtonBox>
          <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleCancelBtn('name')}>
            취소
          </CommentButton>
          <CommentButton type="submit" disabled={comment.length < 1} styleType={BtnStyleType.BTN_ONLYFONT}>
            등록
          </CommentButton>
        </St.CancelSubmitButtonBox>
      </St.InputBox>
    </form>
  );
}

export default CancelSubmitBox;
