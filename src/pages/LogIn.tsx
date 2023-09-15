import { useEffect } from 'react';
import SignInForm from '../components/auth/signInForm/SignInForm';
import Footer from '../components/common/footer/Footer';
import Header from '../components/common/header/Header';
import MetaTags from '../components/common/metaTags/MetaTags';
import { useNavigate } from 'react-router';
import { Alert } from '../components/common/modal/alert';

function LogIn() {
  return (
    <>
      {' '}
      <MetaTags
        title="로그인 | Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl="https://amigo-signal.com/login"
        ogDescription="로그인 하고 amigo-signal의 서비스를 이용해보세요."
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      <Header />
      <SignInForm />
      <Footer />
    </>
  );
}

export default LogIn;
