import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPartnerPost } from '../api/supabase/partner';
import PartnerCommentsList from '../components/partner/partnerComment/PartnerComments';
import PartnerDetailInfo from '../components/partner/partnerDetailInfo/PartnerDetailInfo';

function PartnerDetail() {
  const { postid } = useParams<string>();

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
      <PartnerCommentsList />
    </>
  );
}

export default PartnerDetail;
