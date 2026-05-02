import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/createOrder', async (ingredientsIds, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredientsIds);

    return {
      _id: response.order._id,
      status: response.order.status,
      name: response.order.name,
      createdAt: response.order.createdAt,
      updatedAt: response.order.updatedAt,
      number: response.order.number,
      ingredients: ingredientsIds
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Не удалось оформить заказ'
    );
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.orderModalData = null;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload ?? 'Не удалось оформить заказ';
      });
  }
});

export const { closeOrderModal } = orderSlice.actions;

export default orderSlice.reducer;
