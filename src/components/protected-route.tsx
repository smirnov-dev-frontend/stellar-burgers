import { FC, ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Preloader } from '@ui';
import { useSelector } from '../services/store';
import {
  selectIsAuthChecked,
  selectIsAuthenticated
} from '../services/selectors/userSelectors';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  element?: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  element
}) => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return element || <Outlet />;
};
