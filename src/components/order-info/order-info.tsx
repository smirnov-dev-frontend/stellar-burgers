import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/ingredientsSelectors';
import {
  selectFeedOrders,
  selectSelectedOrder,
  selectUserOrders
} from '../../services/selectors/feedSelectors';
import {
  clearSelectedOrder,
  fetchOrderByNumber
} from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  const ingredients = useSelector(selectIngredients);
  const feedOrders = useSelector(selectFeedOrders);
  const userOrders = useSelector(selectUserOrders);
  const selectedOrder = useSelector(selectSelectedOrder);

  const allOrders: TOrder[] = [...feedOrders, ...userOrders];

  const orderFromStore =
    allOrders.find((order) => order.number === Number(number)) || null;

  const orderData = orderFromStore || selectedOrder;

  useEffect(() => {
    if (!orderFromStore && number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }

    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, number, orderFromStore]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);

          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count += 1;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
