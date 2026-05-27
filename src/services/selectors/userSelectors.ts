import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUpdateUserError = (state: RootState) =>
  state.user.updateUserError;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.user.user);
