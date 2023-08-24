import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPartnerPost } from '../api/supabase/partner';
import PartnerCommentsList from '../components/partner/partnerComment/PartnerComments';
import PartnerDetailInfo from '../components/partner/partnerDetailInfo/PartnerDetailInfo';
import Communication from '../components/partner/communicate/Communication';
import useSessionStore from '../zustand/store';

function PartnerDetail() {
  const { postid } = useParams<string>();
  console.log('게시글 아이디인가요', postid);
  const { session } = useSessionStore();
  const logInUserId = session?.user.id;

  const { data: partnerPost, isLoading, isError } = useQuery(['partnerPost', postid], () => getPartnerPost({ postId: postid as string }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const partnerPostData = partnerPost.data!;
  console.log('해당 글 정보가 다 들어오나요', partnerPostData);
  return (
    <>
      <PartnerDetailInfo partnerPostData={partnerPostData} />
      {logInUserId ? <Communication postId={postid} writerId={partnerPostData.writerId} logInUserId={logInUserId} /> : <></>}
      <PartnerCommentsList />
    </>
  );
}

export default PartnerDetail;
