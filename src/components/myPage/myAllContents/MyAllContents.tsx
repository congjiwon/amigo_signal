import AppliedPosts from '../appliedPosts/AppliedPosts';
import MyContentsTabs from '../myContentsTabs/MyContentsTabs';
import MyPartnerPost from '../myPartnerPost/MyPartnerPost';
import icon_tab_01 from '../../../assets/imgs/myPage/icon_tab01.png';
import icon_tab_02 from '../../../assets/imgs/myPage/icon_tab02.png';
import icon_tab_03 from '../../../assets/imgs/myPage/icon_tab03.png';
import icon_tab_04 from '../../../assets/imgs/myPage/icon_tab04.png';
import icon_tab_05 from '../../../assets/imgs/myPage/icon_tab05.png';
import BookmarkedPosts from '../bookmarkedPosts/BookmarkedPosts';
import MySpotShare from '../mySpotShare/MySpotShare';
import LikedSpotShare from '../likedSpotShare/LikedSpotShare';

export default function () {
  const tabs = [
    { label: '동행 찾기 작성글', content: <MyPartnerPost />, iconUrl: icon_tab_01 },
    { label: '동행 찾기 참여글', content: <AppliedPosts />, iconUrl: icon_tab_02 },
    { label: '동행 찾기 북마크', content: <BookmarkedPosts />, iconUrl: icon_tab_03 },
    { label: '스팟 공유 작성글', content: <MySpotShare />, iconUrl: icon_tab_04 },
    { label: '스팟 공유 좋아요', content: <LikedSpotShare />, iconUrl: icon_tab_05 },
  ];

  return (
    <>
      <MyContentsTabs tabs={tabs} />
    </>
  );
}
