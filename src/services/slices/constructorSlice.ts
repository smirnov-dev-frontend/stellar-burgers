import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const moveItem = <T>(items: T[], fromIndex: number, toIndex: number): T[] => {
  const result = [...items];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
};

const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          state.bun = ingredient;
          return;
        }

        state.ingredients.push(ingredient);
      },
      prepare(ingredient: TIngredient) {
        return {
          payload: {
            ...ingredient,
            id: crypto.randomUUID()
          }
        };
      }
    },

    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;

      if (index <= 0) {
        return;
      }

      state.ingredients = moveItem(state.ingredients, index, index - 1);
    },

    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;

      if (index >= state.ingredients.length - 1) {
        return;
      }

      state.ingredients = moveItem(state.ingredients, index, index + 1);
    },

    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
