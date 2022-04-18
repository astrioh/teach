import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../api/auth';

const authContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const signIn = (email, password) => {
    return auth.signIn(email, password).then((userData) => {
      if (userData.accessToken) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    });
  };

  const signUp = (email, password, fullName, bio, role) => {
    return auth
      .signUp(email, password, fullName, bio, role)
      .then((userData) => {
        if (userData.accessToken) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      });
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
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
