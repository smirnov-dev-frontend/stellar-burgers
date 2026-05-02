import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/selectors/constructorSelectors';
import { selectIsAuthenticated } from '../../services/selectors/userSelectors';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const orderRequest = false;
  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  };

  const closeOrderModal = () => {};

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
      closeOrderModal={closeOrderModal}
    />
  );
};
