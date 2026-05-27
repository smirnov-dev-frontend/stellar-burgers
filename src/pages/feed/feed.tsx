import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { fetchFeedOrders } from '../../services/slices/feedSlice';
import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/selectors/feedSelectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeedOrders());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return <div className='pt-10 text text_type_main-medium'>{error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
