import { useEffect } from 'react';
import '../../index.css';
import styles from './app.module.css';

import { Route, Routes } from 'react-router-dom';

import { AppHeader } from '@components';
import { Preloader } from '@ui';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import {
  getUser,
  hasAccessToken,
  setAuthChecked
} from '../../services/slices/userSlice';
import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '../../services/selectors/ingredientsSelectors';
import { selectIsAuthChecked } from '../../services/selectors/userSelectors';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const dispatch = useDispatch();

  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectIngredientsError);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  useEffect(() => {
    dispatch(fetchIngredients());

    if (hasAccessToken()) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch]);

  if (!isAuthChecked && hasAccessToken()) {
    return <Preloader />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />

          <Route
            path='/login'
            element={<ProtectedRoute onlyUnAuth element={<Login />} />}
          />
          <Route
            path='/register'
            element={<ProtectedRoute onlyUnAuth element={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
          />
          <Route
            path='/reset-password'
            element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
          />

          <Route
            path='/profile'
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path='/profile/orders'
            element={<ProtectedRoute element={<ProfileOrders />} />}
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет ингредиентов
        </div>
      )}
    </div>
  );
};

export default App;
