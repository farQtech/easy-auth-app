import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import { ROUTE_PATHS } from '../utils/constants';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = getToken();

  if (token) {
    return <Navigate to={ROUTE_PATHS.APP} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
