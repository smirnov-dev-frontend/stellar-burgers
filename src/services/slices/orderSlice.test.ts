import orderReducer, { closeOrderModal, createOrder } from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order-id',
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2026-05-27T18:00:00.000Z',
  updatedAt: '2026-05-27T18:00:00.000Z',
  number: 12345,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa093c'
  ]
};

describe('orderSlice', () => {
  it('должен устанавливать orderRequest в true при начале создания заказа', () => {
    const state = orderReducer(
      undefined,
      createOrder.pending('', mockOrder.ingredients)
    );

    expect(state).toEqual({
      orderRequest: true,
      orderModalData: null,
      orderError: null
    });
  });

  it('должен записывать данные заказа и устанавливать orderRequest в false при успешном создании заказа', () => {
    const state = orderReducer(
      {
        orderRequest: true,
        orderModalData: null,
        orderError: null
      },
      createOrder.fulfilled(mockOrder, '', mockOrder.ingredients)
    );

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: mockOrder,
      orderError: null
    });
  });

  it('должен записывать ошибку и устанавливать orderRequest в false при ошибке создания заказа', () => {
    const errorMessage = 'Не удалось оформить заказ';

    const state = orderReducer(
      {
        orderRequest: true,
        orderModalData: null,
        orderError: null
      },
      createOrder.rejected(null, '', mockOrder.ingredients, errorMessage)
    );

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: null,
      orderError: errorMessage
    });
  });

  it('должен очищать данные модального окна заказа', () => {
    const state = orderReducer(
      {
        orderRequest: false,
        orderModalData: mockOrder,
        orderError: 'Ошибка'
      },
      closeOrderModal()
    );

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: null,
      orderError: null
    });
  });
});
