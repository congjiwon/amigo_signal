import MyPartnerPost from '../myPartnerPost/MyPartnerPost';
import * as St from './style';

export default function () {
  return (
    <St.MyAllContentsLayout>
      <St.MyAllContentsLNB>
        <nav>
          <ul>
            <li>동행찾기 작성글</li>
            <li>동행찾기 참여글</li>
            <li>동행찾기 북마크</li>
          </ul>
        </nav>
      </St.MyAllContentsLNB>
      <St.MyAllContentsPanel>
        <MyPartnerPost />
      </St.MyAllContentsPanel>
    </St.MyAllContentsLayout>
  );
}
