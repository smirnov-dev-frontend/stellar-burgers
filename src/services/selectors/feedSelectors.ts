import { RootState } from '../store';

export const selectFeedOrders = (state: RootState) => state.feed.feedOrders;
export const selectUserOrders = (state: RootState) => state.feed.userOrders;
export const selectFeedInfo = (state: RootState) => state.feed.feedInfo;

export const selectFeedLoading = (state: RootState) => state.feed.isFeedLoading;
export const selectUserOrdersLoading = (state: RootState) =>
  state.feed.isUserOrdersLoading;

export const selectFeedError = (state: RootState) => state.feed.feedError;
export const selectUserOrdersError = (state: RootState) =>
  state.feed.userOrdersError;
