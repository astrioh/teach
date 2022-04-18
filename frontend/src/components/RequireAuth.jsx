import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import NotFound from '../pages/NotFound';

const RequireAuth = ({ children, roles }) => {
  let auth = useAuth();

  const userHasRequiredRole =
    auth.user && roles.includes(auth.user.role.id) ? true : false;

  if (!auth.user) {
    return <Navigate to='/login' />;
  }

  if (auth.user && !userHasRequiredRole) {
    return <NotFound />;
  }

  return children || <Outlet />;
};

export default RequireAuth;
