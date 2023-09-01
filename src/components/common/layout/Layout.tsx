import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import * as St from './style';

const Layout = () => {
  return (
    <>
      <Header />
      <St.LayoutContainer>
        <Outlet />
      </St.LayoutContainer>
      <Footer />
    </>
  );
};

export default Layout;
