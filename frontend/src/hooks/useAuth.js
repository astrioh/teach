import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '../api/auth';

const authContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const signin = (email, password) => {
    return auth.login(email, password).then((userData) => {
      if (userData.accessToken) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    });
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    signin,
    signout,
  };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
