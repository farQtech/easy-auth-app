import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import { ROUTE_PATHS } from '../utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to={ROUTE_PATHS.SIGNIN} replace />;
  }

  return <>{children}</>;
};
