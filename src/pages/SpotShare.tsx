import { Link } from 'react-router-dom';
import SpotShareList from '../components/spotShare/spotShareList/SpotShareList';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import SpotShareBanner from '../components/common/banner/SpotShareBanner';

function SpotShare() {
  return (
    <>
      <Header />
      <SpotShareBanner />
      <SpotShareList />
      <Footer />
    </>
  );
}

export default SpotShare;
