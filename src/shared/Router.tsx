import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from '../pages/Intro';
import LogIn from '../pages/LogIn';
import MyPage from '../pages/MyPage';
import Partner from '../pages/Partner';
import PartnerWrite from '../pages/PartnerWrite';
import SignUp from '../pages/SignUp';
import SpotShare from '../pages/SpotShare';
import SpotShareWrite from '../pages/SpotShareWrite';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PartnerDetail from '../pages/ParterDetail';
import SpotShareDetail from '../pages/SpotShareDetail';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/partner/detail/:postid" element={<PartnerDetail />} />
        <Route path="/partner/write" element={<PartnerWrite />} />
        <Route path="/spotshare" element={<SpotShare />} />
        <Route path="/spotshare/detail/:postid" element={<SpotShareDetail />} />
        <Route path="/spotshare/write" element={<SpotShareWrite />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
