import { useNavigate } from 'react-router';
import SignUpForm from '../components/auth/signUpForm/SignUpForm';
import Footer from '../components/common/footer/Footer';
import Header from '../components/common/header/Header';
import MetaTags from '../components/common/metaTags/MetaTags';
import { useEffect } from 'react';
import { Alert } from '../components/common/modal/alert';

function SignUp() {
  window.history.forward();

  return (
    <>
      {' '}
      <MetaTags
        title="회원가입 | Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl="https://amigo-signal.com/signup"
        ogDescription="회원가입을 통해 amigo-signal과 함께 해요."
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      <Header />
      <SignUpForm />
      <Footer />
    </>
  );
}

export default SignUp;
