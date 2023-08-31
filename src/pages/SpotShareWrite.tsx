import { useParams } from 'react-router';
import UpdateTemplate from '../components/spotShare/spotShareTemplate/UpdateTemplate';
import WriteTemplate from '../components/spotShare/spotShareTemplate/WriteTemplate';

function SpotShareWrite() {
  const { postid: postId } = useParams();
  return <>{postId ? <UpdateTemplate postId={postId} /> : <WriteTemplate />}</>;
}

export default SpotShareWrite;
