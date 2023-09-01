import React from 'react';
import SignInForm from '../components/auth/signInForm/SignInForm';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';

function LogIn() {
  return (
    <>
      <Header />
      <SignInForm />
      <Footer />
    </>
  );
}

export default LogIn;
