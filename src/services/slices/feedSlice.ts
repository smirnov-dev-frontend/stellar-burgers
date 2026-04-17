import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedSummary = {
  total: number;
  totalToday: number;
};

type TFeedState = {
  feedOrders: TOrder[];
  userOrders: TOrder[];
  feedInfo: TFeedSummary;
  isFeedLoading: boolean;
  isUserOrdersLoading: boolean;
  feedError: string | null;
  userOrdersError: string | null;
};

const initialState: TFeedState = {
  feedOrders: [],
  userOrders: [],
  feedInfo: {
    total: 0,
    totalToday: 0
  },
  isFeedLoading: false,
  isUserOrdersLoading: false,
  feedError: null,
  userOrdersError: null
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

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
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
      });
  }
});

export default feedSlice.reducer;
