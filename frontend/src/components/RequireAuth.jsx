import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  console.log(auth.user);
  return auth.user ? children : <Navigate to={'/login'} />;
};

export default RequireAuth;
