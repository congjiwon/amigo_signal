import { useParams } from 'react-router';
import PartnerWriteTemplate from '../components/partner/partnerWriteTemplate/PartnerWriteTemplate';
import PartnerUpdateTemplate from '../components/partner/partnerUpdateTemplate/PartnerUpdateTemplate';
function PartnerWrite() {
  const { postid: postId } = useParams();
  return <>{postId ? <PartnerUpdateTemplate postId={postId} /> : <PartnerWriteTemplate />}</>;
}

export default PartnerWrite;
