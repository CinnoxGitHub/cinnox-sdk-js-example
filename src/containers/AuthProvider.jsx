import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../contexts/AuthContext';

const AuthProvider = (props) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);

  const contextValue = useMemo(() => ({
    isLogin,
    setIsLogin,
  }), [isLogin, setIsLogin]);

  return (
    <AuthContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </AuthContext.Provider>
  )
};

AuthProvider.defaultProps = {
  children: null,
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};
export default AuthProvider;
