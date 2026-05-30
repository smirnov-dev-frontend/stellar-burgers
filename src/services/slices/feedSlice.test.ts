import feedReducer, {
  clearSelectedOrder,
  fetchFeedOrders,
  fetchOrderByNumber,
  fetchUserOrders
} from './feedSlice';
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

const initialState = {
  feedOrders: [],
  userOrders: [],
  selectedOrder: null,
  feedInfo: {
    total: 0,
    totalToday: 0
  },
  isFeedLoading: false,
  isUserOrdersLoading: false,
  isSelectedOrderLoading: false,
  feedError: null,
  userOrdersError: null,
  selectedOrderError: null
};

describe('feedSlice', () => {
  describe('fetchFeedOrders', () => {
    it('должен устанавливать isFeedLoading в true при начале запроса ленты заказов', () => {
      const state = feedReducer(undefined, fetchFeedOrders.pending(''));

      expect(state).toEqual({
        ...initialState,
        isFeedLoading: true
      });
    });

    it('должен записывать заказы и общую информацию при успешной загрузке ленты заказов', () => {
      const state = feedReducer(
        {
          ...initialState,
          isFeedLoading: true
        },
        fetchFeedOrders.fulfilled(
          {
            orders: [mockOrder],
            total: 100,
            totalToday: 10
          },
          ''
        )
      );

      expect(state).toEqual({
        ...initialState,
        feedOrders: [mockOrder],
        feedInfo: {
          total: 100,
          totalToday: 10
        },
        isFeedLoading: false
      });
    });

    it('должен записывать ошибку при неуспешной загрузке ленты заказов', () => {
      const errorMessage = 'Не удалось загрузить ленту заказов';

      const state = feedReducer(
        {
          ...initialState,
          isFeedLoading: true
        },
        fetchFeedOrders.rejected(null, '', undefined, errorMessage)
      );

      expect(state).toEqual({
        ...initialState,
        feedError: errorMessage,
        isFeedLoading: false
      });
    });
  });

  describe('fetchUserOrders', () => {
    it('должен устанавливать isUserOrdersLoading в true при начале запроса истории заказов', () => {
      const state = feedReducer(undefined, fetchUserOrders.pending(''));

      expect(state).toEqual({
        ...initialState,
        isUserOrdersLoading: true
      });
    });

    it('должен записывать историю заказов при успешной загрузке', () => {
      const state = feedReducer(
        {
          ...initialState,
          isUserOrdersLoading: true
        },
        fetchUserOrders.fulfilled([mockOrder], '')
      );

      expect(state).toEqual({
        ...initialState,
        userOrders: [mockOrder],
        isUserOrdersLoading: false
      });
    });

    it('должен записывать ошибку при неуспешной загрузке истории заказов', () => {
      const errorMessage = 'Не удалось загрузить историю заказов';

      const state = feedReducer(
        {
          ...initialState,
          isUserOrdersLoading: true
        },
        fetchUserOrders.rejected(null, '', undefined, errorMessage)
      );

      expect(state).toEqual({
        ...initialState,
        userOrdersError: errorMessage,
        isUserOrdersLoading: false
      });
    });
  });

  describe('fetchOrderByNumber', () => {
    it('должен устанавливать isSelectedOrderLoading в true при начале запроса заказа по номеру', () => {
      const state = feedReducer(
        undefined,
        fetchOrderByNumber.pending('', 12345)
      );

      expect(state).toEqual({
        ...initialState,
        isSelectedOrderLoading: true
      });
    });

    it('должен записывать выбранный заказ при успешной загрузке', () => {
      const state = feedReducer(
        {
          ...initialState,
          isSelectedOrderLoading: true
        },
        fetchOrderByNumber.fulfilled(mockOrder, '', 12345)
      );

      expect(state).toEqual({
        ...initialState,
        selectedOrder: mockOrder,
        isSelectedOrderLoading: false
      });
    });

    it('должен записывать ошибку при неуспешной загрузке заказа по номеру', () => {
      const errorMessage = 'Не удалось загрузить заказ';

      const state = feedReducer(
        {
          ...initialState,
          isSelectedOrderLoading: true
        },
        fetchOrderByNumber.rejected(null, '', 12345, errorMessage)
      );

      expect(state).toEqual({
        ...initialState,
        selectedOrderError: errorMessage,
        isSelectedOrderLoading: false
      });
    });
  });

  it('должен очищать выбранный заказ', () => {
    const state = feedReducer(
      {
        ...initialState,
        selectedOrder: mockOrder,
        selectedOrderError: 'Ошибка'
      },
      clearSelectedOrder()
    );

    expect(state).toEqual({
      ...initialState,
      selectedOrder: null,
      selectedOrderError: null
    });
  });
});
