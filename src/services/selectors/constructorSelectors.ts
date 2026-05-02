import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.constructorBurger;

export const selectConstructorBun = (state: RootState) =>
  state.constructorBurger.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.constructorBurger.ingredients;
