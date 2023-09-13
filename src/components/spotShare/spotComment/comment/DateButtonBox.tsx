import { BtnStyleType } from '../../../../types/styleTypes';
import { CommentButton } from '../../../common/button/Button';
import * as St from '../style';
import { DateButtonBoxProps } from '../type/CommentType';

function DateButtonBox({ comment, isLoginUser, handleIsOpenBtn, handleDelBtn }: DateButtonBoxProps) {
  return (
    <St.DateButtonBox>
      {' '}
      <St.DateBox>
        <St.DateParagraph>{comment!.date!.substring(0, 10) + ' ' + comment!.date!.substring(11, 16)}</St.DateParagraph>
      </St.DateBox>
      {isLoginUser && (
        <St.ButtonBox>
          <div>
            <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('updateComment', comment!.id)}>
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
      <CommentButton type="button" styleType={BtnStyleType.BTN_ONLYFONT} onClick={() => handleIsOpenBtn('postReComment', comment!.id)}>
        답글쓰기
      </CommentButton>
    </St.DateButtonBox>
  );
}

export default DateButtonBox;
