import { styled } from 'styled-components';

export const MoveButtonArea = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

export const CommentContainer = styled.div`
  @media (max-width: 1256px) {
    padding: 0 50px 0 50px;
  }
  @media (max-width: 500px) {
    padding: 24px 20px 72px 20px;
  }
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
  gap: 24px;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 375px) {
    gap: 16px;
    margin-bottom: 25px;
  }
`;

export const CommentTextarea = styled.textarea`
  resize: none;
  flex: 1 1 auto;
  height: 20px;
  padding: 14px 20px 14px 20px;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
  @media (max-width: 500px) {
    width: 231px;
    height: 20px;
    padding: 10px 12px;
    color: var(--dark-gray, #3f4656);
    border-radius: 8px;
    border: 1px solid var(--light-gray, #e3e9f3);
  }
`;

export const CommentButton = styled.button`
  width: 78px;
  height: 48px;
  background-color: white;
  color: black;
  border-radius: 15px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 64px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #000;
  }
`;

export const PartnerCommentsContainerBox = styled.div``;

export const PartnerCommentsBox = styled.div``;

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
  line-height: 130%;
  word-break: break-all;
  @media (max-width: 500px) {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
`;

export const CommentBottomBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateButtonBox = styled.div`
  align-items: baseLine;
  display: flex;
  margin-left: 52px;
  margin-bottom: 24px;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

export const DateBox = styled.div`
  margin-right: 6px;
  @media (max-width: 500px) {
    margin-right: 6px;
  }
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

export const FormContainer = styled.form`
  padding-right: 102px;
  padding-left: 52px;
  @media (max-width: 800px) {
    padding-right: 0px;
  }
`;

export const InputBox = styled.div`
  position: relative;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
  padding: 14px 20px 43px 20px;
  margin-bottom: 24px;
  @media (max-width: 800px) {
    height: 43px;
    padding: 10px 12px 33px 12px;
    margin-right: 0px;
    margin-bottom: 24px;
    border-radius: 8px;
  }
`;

export const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 43px;
  border: 0;
  outline: 0;
`;

export const ReCommentInputBox = styled.div`
  position: relative;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
  padding: 14px 20px 43px 20px;
  margin-right: 102px;
  @media (max-width: 800px) {
    height: 43px;
    margin-left: 52px;
    margin-right: 0px;
    padding: 10px 12px 33px 12px;
    border-radius: 8px;
  }
`;
export const CancelSubmitButtonBox = styled.div`
  position: absolute;
  bottom: 14px;
  right: 24px;
  display: flex;
  align-items: center;
  @media (max-width: 375px) {
    gap: 4px;
    color: var(--dark-gray, #3f4656);
    bottom: 12px;
    right: 6px;
    font-size: 14px;
  }
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
