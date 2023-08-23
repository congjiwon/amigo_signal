import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPartnerPost } from '../api/supabase/partner';
import PartnerCommentsList from '../components/partner/PartnerCommentsList';
import PartnerDetailInfo from '../components/partner/partnerDetailInfo/PartnerDetailInfo';
import Communication from '../components/partner/communicate/Communication';
import useSessionStore from '../zustand/store';

function PartnerDetail() {
  const { postid } = useParams<string>();

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

  return (
    <>
      <PartnerDetailInfo partnerPostData={partnerPostData} />
      {logInUserId ? <Communication postId={postid} writerId={partnerPostData.writerId} /> : <></>}
      <PartnerCommentsList />
    </>
  );
}

export default PartnerDetail;
