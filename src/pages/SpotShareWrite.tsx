import { useParams } from 'react-router';
import MetaTags from '../components/common/metaTags/MetaTags';
import UpdateTemplate from '../components/spotShare/spotShareTemplate/UpdateTemplate';
import WriteTemplate from '../components/spotShare/spotShareTemplate/WriteTemplate';

function SpotShareWrite() {
  const { postid: postId } = useParams();
  return (
    <>
      {' '}
      <MetaTags
        title="스팟 공유 글작성 | Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl="https://amigo-signal.com/spatshare/write"
        ogDescription="나만의 스팟을 공유하세요."
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      {postId ? <UpdateTemplate postId={postId} /> : <WriteTemplate />}
    </>
  );
}

export default SpotShareWrite;
