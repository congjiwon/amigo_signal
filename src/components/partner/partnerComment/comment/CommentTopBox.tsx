import DefaultProfileImage from '../../../../assets/imgs/users/default_profile_img.png';
import * as St from '../style';
import { CommentTopBoxProps } from '../type/CommentType';

function CommentTopBox({ user, storageUrl, isPostWriter, comment }: CommentTopBoxProps) {
  return (
    <St.CommentTopBox key={user.id}>
      <div>
        <St.Img src={user! && user!.profileImageUrl! ? `${storageUrl}/${user!.profileImageUrl!}` : DefaultProfileImage} alt={`${user.nickName}님 프로필 이미지`} />
      </div>
      <St.WriterContainerBox>
        <St.WriterBox>
          <St.NickNameParagraph>{user.nickName}</St.NickNameParagraph>
          {isPostWriter && <St.WriterParagraph>작성자</St.WriterParagraph>}
        </St.WriterBox>
        <St.CommentBox>
          <St.CommentParagraph>{comment?.content}</St.CommentParagraph>
        </St.CommentBox>
      </St.WriterContainerBox>
    </St.CommentTopBox>
  );
}

export default CommentTopBox;
