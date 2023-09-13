import { styled } from 'styled-components';

export const MoveButtonArea = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

export const CommentLengthBox = styled.div`
  height: 21px;
`;

export const CommentLengthParagraph = styled.p`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;

  align-items: center;
  margin-bottom: 32px;
`;

export const CommentTextarea = styled.textarea`
  resize: none;
  width: 1057px;
  height: 20px;
  padding: 14px 20px 14px 20px;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
`;

export const CommentButton = styled.button`
  width: 78px;
  height: 48px;
  background-color: white;
  color: black;
  border-radius: 15px;
  cursor: pointer;
`;

export const PartnerCommentsContainerBox = styled.div``;

export const PartnerCommentsBox = styled.div`
  margin-bottom: 25px;
`;

export const CommentTopBox = styled.div`
  display: flex;
`;

export const WriterBox = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 6px;
`;

export const NickNameParagraph = styled.p`
  margin-right: 16px;
  font-weight: bold;
`;

export const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 50px;
`;

export const WriterContainerBox = styled.div`
  flex-direction: column;
`;

export const CommentBox = styled.div`
  margin-bottom: 6px;
`;

export const CommentParagraph = styled.p`
  white-space: pre;
  line-height: 130%;
`;

export const CommentBottomBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateButtonBox = styled.div`
  align-items: center;
  display: flex;
  margin-left: 52px;
  margin-bottom: 24px;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

export const DateBox = styled.div`
  margin-right: 12px;
`;

export const DateParagraph = styled.p`
  color: var(--gray, #adb1b8);
  font-size: 12px;
`;

export const Bar = styled.p`
  margin-bottom: 1px;
  font-size: 12px;
  color: var(--gray, #adb1b8);
`;

export const InputBox = styled.div`
  position: relative;
`;

export const Textarea = styled.textarea`
  resize: none;
  width: 1005px;
  height: 43px;
  padding: 14px 20px 43px 20px;
  margin-left: 52px;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
`;

export const RecommentTextarea = styled.textarea`
  resize: none;
  width: 953px;
  height: 43px;
  padding: 14px 20px 43px 20px;
  margin-left: 52px;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
`;

export const CancelSubmitButtonBox = styled.div`
  position: absolute;
  top: 65px;
  right: 109px;
  display: flex;
  align-items: center;
`;

export const WriterParagraph = styled.p`
  color: var(--purple, #643bdc);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.3px;
`;

export const ReCommentBox = styled.div`
  margin-bottom: 24px;
  margin-left: 52px;
`;

export const PartnerReCommentsBox = styled.div``;
