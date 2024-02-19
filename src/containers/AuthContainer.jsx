import { useState } from 'react';

import LoginForm from '../components/LoginForm';
import UserSection from '../components/UserSection';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(false);

  if(!isLogin) {
    return (
      <LoginForm onSubmit={() => setIsLogin(true)} />
    );
  }

  return (
    <UserSection onLogout={() => setIsLogin(false)} />
  );
};

export default AuthContainer;
