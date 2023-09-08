import PartnerBanner from '../components/common/banner/PartnerBanner';
import Footer from '../components/common/footer/Footer';
import Header from '../components/common/header/Header';
import MetaTags from '../components/common/metaTags/MetaTags';
import PartnerList from '../components/partner/PartnerList';

const Partner = () => {
  return (
    <>
      <MetaTags
        title="동행 찾기 | Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl="https://amigo-signal.com/partner"
        ogDescription="동행을 찾아보세요"
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      <Header />
      <PartnerBanner />
      <PartnerList />
      <Footer />
    </>
  );
};

export default Partner;
