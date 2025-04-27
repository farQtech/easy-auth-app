import { Routes, Route, Navigate } from 'react-router-dom';
import { SignUpPage } from '../pages/SignUpPage';
import { SignInPage } from '../pages/SignInPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ApplicationPage from '../pages/ApplicationPage';
import NotFoundPage from '../pages/NotFoundPage';
import PublicRoute from '../components/PublicRoute';
import { ROUTE_PATHS } from '../utils/constants';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to={ROUTE_PATHS.SIGNIN} replace={true} />}/>
    <Route path={ROUTE_PATHS.SIGNUP} element={
      <PublicRoute>
        <SignUpPage />
        </PublicRoute>
      } />
    <Route path={ROUTE_PATHS.SIGNIN} element={
      <PublicRoute>
        <SignInPage />
      </PublicRoute>
    } />
    <Route
      path={ROUTE_PATHS.APP}
      element={
        <ProtectedRoute>
          <ApplicationPage />
        </ProtectedRoute>
      }
    />
    <Route path={ROUTE_PATHS.NOT_FOUND} element={
      <PublicRoute>
        <NotFoundPage />
      </PublicRoute>
    } />
  </Routes>
);
