import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/feedSlice';
import {
  selectUserOrders,
  selectUserOrdersError,
  selectUserOrdersLoading
} from '../../services/selectors/feedSelectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectUserOrders);
  const isLoading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return (
      <main className='pt-10'>
        <div className='text text_type_main-medium'>{error}</div>
      </main>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
