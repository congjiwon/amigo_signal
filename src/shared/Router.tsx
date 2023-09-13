import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/common/layout/Layout';
import ErrorPage from '../pages/ErrorPage';
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
import StyledWrapper from '../components/common/layout/StyleWrapper';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="*" element={<ErrorPage />} />

        <Route
          path="/login"
          element={
            <StyledWrapper>
              <LogIn />
            </StyledWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <StyledWrapper>
              <SignUp />
            </StyledWrapper>
          }
        />
        <Route
          path="/partner"
          element={
            <StyledWrapper>
              <Partner />
            </StyledWrapper>
          }
        />
        <Route
          path="/spotshare"
          element={
            <StyledWrapper>
              <SpotShare />
            </StyledWrapper>
          }
        />

        <Route element={<Layout />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/partner/detail/:postid" element={<PartnerDetail />} />
          <Route path="/partner/write" element={<PartnerWrite />} />
          <Route path="/partner/write/:postid" element={<PartnerWrite />} />
          <Route path="/spotshare/detail/:postid" element={<SpotShareDetail />} />
          <Route path="/spotshare/write" element={<SpotShareWrite />} />
          <Route path="/spotshare/write/:postid" element={<SpotShareWrite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
