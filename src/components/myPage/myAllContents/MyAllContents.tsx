import MyContentsTabs from '../myContentsTabs/MyContentsTabs';
import MyPartnerPost from '../myPartnerPost/MyPartnerPost';
import * as St from './style';

export default function () {
  const tabs = [
    { label: '동행찾기 작성글', content: <MyPartnerPost /> },
    { label: '동행찾기 참여글', content: <div>참여글</div> },
    { label: '동행찾기 북마크', content: <div>북마크</div> },
  ];
  return (
    <>
      <MyContentsTabs tabs={tabs} />
    </>
  );
}
