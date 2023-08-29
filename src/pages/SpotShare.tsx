import { Link } from 'react-router-dom';
import SpotShareList from '../components/spotShare/spotShareList/SpotShareList';

function SpotShare() {
  return (
    <>
      <Link to="write">글쓰기 버튼</Link>
      <SpotShareList />
    </>
  );
}

export default SpotShare;
