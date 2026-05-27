import { rootReducer } from './store';

describe('rootReducer', () => {
   it('должен возвращать корректное начальное состояние при неизвестном экшене', () => {
      const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

      expect(initialState).toEqual({
         ingredients: {
            items: [],
            isLoading: false,
            error: null
         },
         user: {
            user: null,
            isAuthChecked: false,
            isLoading: false,
            error: null,
            updateUserError: null
         },
         feed: {
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
         },
         constructorBurger: {
            bun: null,
            ingredients: []
         },
         order: {
            orderRequest: false,
            orderModalData: null,
            orderError: null
         }
      });
   });
});