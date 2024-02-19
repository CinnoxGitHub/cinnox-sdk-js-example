import { useState, useCallback } from 'react';

import LoginForm from '../components/LoginForm';
import UserSection from '../components/UserSection';
import { initSDK } from '../utils/sdkHelper';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = useCallback(async (payload) => {
    const { service, account, password } = payload;
    const SDK = initSDK({ service });
    await SDK.initialize();
    await SDK.login(account, password);
    window.SDK = SDK;

    setIsLogin(true);
  }, []);

  if (!isLogin) {
    return (
      <LoginForm onSubmit={handleLogin} />
    );
  }

  return (
    <UserSection />
  );
};

export default AuthContainer;
