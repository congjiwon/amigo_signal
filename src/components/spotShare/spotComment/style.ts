import { styled } from 'styled-components';

//탑버튼
export const MoveButtonArea = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

// SpotComments
export const CommentLengthBox = styled.div`
  /* width: 49px; */
  height: 21px;
`;

export const CommentLengthParagraph = styled.p`
  /* margin-top: 31px; */
  /* margin-bottom: 10px; */
  font-size: 14px;
`;

// Write
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
  /* margin-bottom: 32px; */
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
`;

export const CommentButton = styled.button`
  align-items: center;
  width: 78px;
  height: 48px;
  background-color: black;
  color: white;
  border-radius: 15px;
  cursor: pointer;
`;

// PartnerCommentsList, reCommentList
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
`;

export const CommentParagraph = styled.p`
  white-space: pre-line;
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
  right: 120px;
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
  line-height: 170%;
`;

export const ReCommentBox = styled.div`
  margin-bottom: 24px;
  margin-left: 52px;
`;

export const PartnerReCommentsBox = styled.div``;
