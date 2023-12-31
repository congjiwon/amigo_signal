import IntroTemplate from '../components/common/Intro/IntroTemplate';
import MetaTags from '../components/common/metaTags/MetaTags';

const Intro = () => {
  return (
    <>
      <MetaTags
        title="Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl="https://amigo-signal.com"
        ogDescription="여행의 즐거움을 함께 나눌 동행을 찾고, 나만의 특별한 스팟을 공유해보세요."
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      <IntroTemplate />
    </>
  );
};

export default Intro;
