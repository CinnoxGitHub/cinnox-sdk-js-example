import { useCallback, useState } from 'react';

import InitializeForm from '../components/InitializeForm';
import LoginForm from '../components/LoginForm';
import UserSection from '../components/UserSection';
import { initSDK, getSDK } from '../utils/sdkHelper';
import { useAuthContext } from '../contexts/AuthContext';

const AuthContainer = () => {
  const { isLogin, setIsLogin } = useAuthContext();
  const [isSdkReady, setIsSdkReady] = useState(false);

  const handleLogin = useCallback(async (payload) => {
    const { account, password } = payload;
    const SDK = getSDK();
    await SDK.auth.login(account, password);

    setIsLogin(true);
  }, [setIsLogin]);

  const handleServiceNameSubmit = useCallback(async (payload) => {
    const { service } = payload;
    const SDK = initSDK({ service });
    await SDK.initialize();
    window.SDK = SDK;

    const idToken = SDK.auth.getIdToken();
    if (idToken?.eid) {
      setIsLogin(true);
    }

    setIsSdkReady(true);
  }, [setIsLogin]);

  const handleLogout = useCallback(() => {
    const SDK = getSDK();
    SDK.auth.logout();
    setIsLogin(false);
  }, [setIsLogin]);

  if (!isSdkReady) {
    return (
      <InitializeForm onSubmit={handleServiceNameSubmit} />
    );
  }

  if (!isLogin) {
    return (
      <LoginForm onSubmit={handleLogin} />
    );
  }

  return (
    <UserSection onLogout={handleLogout} />
  );
};

export default AuthContainer;
