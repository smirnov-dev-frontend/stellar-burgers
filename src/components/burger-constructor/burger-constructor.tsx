import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { closeOrderModal, createOrder } from '../../services/slices/orderSlice';
import { selectConstructorItems } from '../../services/selectors/constructorSelectors';
import { selectIsAuthenticated } from '../../services/selectors/userSelectors';
import {
  selectOrderModalData,
  selectOrderRequest
} from '../../services/selectors/orderSelectors';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(selectConstructorItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds)).then((result) => {
      if (createOrder.fulfilled.match(result)) {
        dispatch(clearConstructor());
      }
    });
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
