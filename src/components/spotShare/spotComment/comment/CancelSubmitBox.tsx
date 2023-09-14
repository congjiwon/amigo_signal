import { BtnStyleType } from '../../../../types/styleTypes';
import { CommentButton } from '../../../common/button/Button';
import * as St from '../style';
import { CancelSubmitBoxProps } from '../type/CommentType';

function CancelSubmitBox({ handleSubmitBtn, comment, handleCancelBtn, handleComment }: CancelSubmitBoxProps) {
  return (
    <St.FormContainer onSubmit={handleSubmitBtn}>
      <St.InputBox>
        <St.Textarea placeholder="댓글을 남겨보세요" value={comment} onChange={handleComment} maxLength={300} />
        <St.CancelSubmitButtonBox>
          <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleCancelBtn('name')}>
            취소
          </CommentButton>
          <CommentButton type="submit" styleType={BtnStyleType.BTN_SUBMITCOMMENT}>
            등록
          </CommentButton>
        </St.CancelSubmitButtonBox>
      </St.InputBox>
    </St.FormContainer>
  );
}

export default CancelSubmitBox;
