import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/common/layout/Layout';
import Intro from '../pages/Intro';
import LogIn from '../pages/LogIn';
import MyPage from '../pages/MyPage';
import Partner from '../pages/Partner';
import PartnerDetail from '../pages/PartnerDetail';
import PartnerWrite from '../pages/PartnerWrite';
import SignUp from '../pages/SignUp';
import SpotShare from '../pages/SpotShare';
import SpotShareDetail from '../pages/SpotShareDetail';
import SpotShareWrite from '../pages/SpotShareWrite';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/partner/detail/:postid" element={<PartnerDetail />} />
          <Route path="/partner/write" element={<PartnerWrite />} />
          <Route path="/spotshare" element={<SpotShare />} />
          <Route path="/spotshare/detail/:postid" element={<SpotShareDetail />} />
          <Route path="/spotshare/write" element={<SpotShareWrite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
