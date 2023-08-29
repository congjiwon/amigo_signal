import { styled } from 'styled-components';

// Write
export const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

export const CommentTextarea = styled.textarea`
  /* text-indent: 24px; */

  resize: none;

  width: 1097px;
  height: 48px;

  margin-bottom: 32px;

  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
`;

export const CommentButton = styled.button`
  width: 78px;
  height: 48px;

  background-color: black;
  color: white;

  border-radius: 15px;
`;

// PartnerCommentsList, reCommentList
export const PartnerCommentsContainerBox = styled.div``;

export const PartnerCommentsBox = styled.div`
  margin-bottom: 25px;

  /* border: 1px solid; */
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
  margin-right: 22px;

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

  /* margin-right: 12px; */
`;

export const CommentParagraph = styled.p`
  white-space: pre-line;

  line-height: 130%;
`;

export const CommentBottomBox = styled.div`
  display: flex;
  flex-direction: column;

  /* margin-left: 52px; */
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
`;

export const Bar = styled.p`
  margin-bottom: 1px;
  font-size: 12px;
  color: var(--gray, #adb1b8);
  /* letter-spacing: 6px; */
`;

export const InputBox = styled.div`
  position: relative;
`;

export const Textarea = styled.textarea`
  resize: none;

  width: 1097px;
  height: 100px;

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
  text-align: center;
  align-items: center;

  width: 51px;
  height: 23px;

  color: white;
  background: var(--gray, #adb1b8);

  border-radius: 30px;

  font-size: 12px;
  /* font-style: normal; */
  /* font-weight: 400; */
  line-height: 170%;
`;

export const ReCommentBox = styled.div`
  margin-bottom: 24px;
  margin-left: 52px;
  /* border: 1px solid; */
`;

export const PartnerReCommentsBox = styled.div`
  /* border: 1px solid; */
`;
