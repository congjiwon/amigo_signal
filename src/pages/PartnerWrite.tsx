import React from 'react';
import { useParams } from 'react-router';
import PartnerWriteTemplate from '../components/partner/partnerWriteTemplate/PartnerWriteTemplate';
import PartnerUpdateTemplate from '../components/partner/partnerUpdateTemplate/PartnerUpdateTemplate';
function PartnerWrite() {
  const { postid: postId } = useParams();
  return (
    <div>
      PartnerWrite page
      {postId ? <PartnerUpdateTemplate postId={postId} /> : <PartnerWriteTemplate />}
      {/* <PartnerWriteTemplate /> */}
    </div>
  );
}

export default PartnerWrite;
