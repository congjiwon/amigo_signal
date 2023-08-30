import SpotComments from '../components/spotShare/spotComment/SpotComments';
import SpotShareDetailContents from '../components/spotShare/spotShareDetail/SpotShareDetailContents';
import TopButton from '../components/common/topbutton/TopButton';

function SpotShareDetail() {
  return (
    <>
      <SpotShareDetailContents />
      <SpotComments />
    </>
  );
}

export default SpotShareDetail;
