import { createContext, useContext } from 'react';

const AuthContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
