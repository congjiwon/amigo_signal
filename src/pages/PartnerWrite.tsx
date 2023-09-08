import { useParams } from 'react-router';
import MetaTags from '../components/common/metaTags/MetaTags';
import PartnerUpdateTemplate from '../components/partner/partnerUpdateTemplate/PartnerUpdateTemplate';
import PartnerWriteTemplate from '../components/partner/partnerWriteTemplate/PartnerWriteTemplate';
function PartnerWrite() {
  const { postid: postId } = useParams();
  return (
    <>
      {' '}
      <MetaTags
        title="동행 찾기 글작성 | Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl="https://amigo-signal.com/partner/write"
        ogDescription="함께 할 동행을 찾아보세요."
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      {postId ? <PartnerUpdateTemplate postId={postId} /> : <PartnerWriteTemplate />}
    </>
  );
}

export default PartnerWrite;
