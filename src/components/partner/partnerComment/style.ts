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
  @media (max-width: 800px) {
    padding: 0 20px;
  }
  @media (max-width: 375px) {
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
  // justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 375px) {
    gap: 16px;
    margin-bottom: 25px;
  }
`;

export const CommentTextarea = styled.textarea`
  resize: none;
  // width: 88.08%;
  flex: 1 1 auto;
  height: 20px;
  padding: 14px 20px 14px 20px;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
  // @media (max-width: 1256px) {
  //   width: 83%;
  // }
  @media (max-width: 800px) {
    width: 77%;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
  @media (max-width: 407px) {
    width: 65%;
  }
  @media (max-width: 375px) {
    width: 231px;
    height: 20px;
    padding: 10px 12px;
    color: var(--dark-gray, #3f4656);
    border-radius: 8px;
    border: 1px solid var(--light-gray, #e3e9f3);
  }
`;

export const CommentButton = styled.button`
  width: 6.5%;
  height: 48px;
  background-color: white;
  color: black;
  border-radius: 15px;
  cursor: pointer;
  // @media (max-width: 1256px) {
  //   width: 7%;
  // }
  @media (max-width: 800px) {
    width: 10%;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }

  @media (max-width: 375px) {
    width: 64px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #000;
  }
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
  white-space: pre-line;
  line-height: 130%;
  @media (max-width: 375px) {
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
  @media (max-width: 375px) {
    margin-bottom: 0px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

export const DateBox = styled.div`
  margin-right: 6px;
  @media (max-width: 375px) {
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

export const InputBox = styled.div`
  position: relative;
  padding-right: 94px;
  padding-left: 52px;
`;

export const Textarea = styled.textarea`
  resize: none;
  // width: 83.75%;
  width: 100%;
  height: 43px;
  padding: 14px 20px 43px 20px;
  margin-left: 52px;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
  // @media (max-width: 1256px) {
  //   width: 78%;
  // }
  // @media (max-width: 800px) {
  //   width: 70%;
  // }
  @media (max-width: 500px) {
    width: 65%;
  }
  @media (max-width: 375px) {
    width: 265px;
    height: 43px;
    margin-left: 43px;
    padding: 10px 12px 33px 12px;
    white-space: pre-line;
  }
`;

export const RecommentTextarea = styled.textarea`
  resize: none;
  width: 953px;
  height: 43px;
  padding: 14px 20px 43px 20px;
  margin-left: 52px;
  border-radius: 15px;
  border: 1px solid var(--light-gray, #e8ebee);
  @media (max-width: 1256px) {
    width: 79.53%;
  }
  @media (max-width: 800px) {
    width: 70%;
  }
  // @media screen and (min-width: 375px) and (max-width: 1256px) {
  //   width: 100%;
  // }
  @media (max-width: 375px) {
    width: 256px;
    height: 43px;
    margin-left: 0px;
    padding: 10px 12px 33px 12px;
  }
`;

export const CancelSubmitButtonBox = styled.div`
  position: absolute;
  top: 65px;
  right: 109px;
  display: flex;
  align-items: center;
  @media (max-width: 1256px) {
    right: 14.1%;
  }
  @media (max-width: 800px) {
    right: 18%;
  }
  @media (max-width: 500px) {
    right: 11%;
  }
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
