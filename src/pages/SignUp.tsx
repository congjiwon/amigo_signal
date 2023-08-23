import SignUpForm from '../components/auth/SignUpForm';
import useSessionStore from '../components/zustand/store';

function SignUp() {
  const session = useSessionStore((state) => state.session);
  console.log(session);
  return (
    <div>
      SignUp Page
      <SignUpForm />
    </div>
  );
}

export default SignUp;
