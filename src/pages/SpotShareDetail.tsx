import SpotComments from '../components/spotShare/spotComment/SpotComments';
import SpotShareDetailContents from '../components/spotShare/spotShareDetail/SpotShareDetailContents';

function SpotShareDetail() {
  // const { postId } = useParams<string>();
  // console.log('그럼이거는', postId);
  return (
    <>
      <SpotShareDetailContents />
      <SpotComments />
    </>
  );
}

export default SpotShareDetail;
