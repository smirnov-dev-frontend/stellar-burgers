import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedSummary = {
  total: number;
  totalToday: number;
};

type TFeedState = {
  feedOrders: TOrder[];
  userOrders: TOrder[];
  selectedOrder: TOrder | null;
  feedInfo: TFeedSummary;
  isFeedLoading: boolean;
  isUserOrdersLoading: boolean;
  isSelectedOrderLoading: boolean;
  feedError: string | null;
  userOrdersError: string | null;
  selectedOrderError: string | null;
};

const initialState: TFeedState = {
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

export const fetchFeedOrders = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void,
  { rejectValue: string }
>('feed/fetchFeedOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();

    return {
      orders: response.orders,
      total: response.total,
      totalToday: response.totalToday
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : 'Не удалось загрузить ленту заказов'
    );
  }
});

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('feed/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : 'Не удалось загрузить историю заказов'
    );
  }
});

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('feed/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);

    if (response.success && response.orders.length > 0) {
      return response.orders[0];
    }

    return rejectWithValue('Заказ не найден');
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Не удалось загрузить заказ'
    );
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
      state.selectedOrderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.pending, (state) => {
        state.isFeedLoading = true;
        state.feedError = null;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.isFeedLoading = false;
        state.feedOrders = action.payload.orders;
        state.feedInfo.total = action.payload.total;
        state.feedInfo.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedOrders.rejected, (state, action) => {
        state.isFeedLoading = false;
        state.feedError =
          action.payload ?? 'Не удалось загрузить ленту заказов';
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.isUserOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isUserOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isUserOrdersLoading = false;
        state.userOrdersError =
          action.payload ?? 'Не удалось загрузить историю заказов';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isSelectedOrderLoading = true;
        state.selectedOrderError = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isSelectedOrderLoading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isSelectedOrderLoading = false;
        state.selectedOrderError =
          action.payload ?? 'Не удалось загрузить заказ';
      });
  }
});

export const { clearSelectedOrder } = feedSlice.actions;

export default feedSlice.reducer;
