import constructorReducer, {
   addIngredient,
   removeIngredient,
   moveIngredientUp,
   moveIngredientDown
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const mockId = '00000000-0000-4000-8000-000000000000';

const mockBun: TIngredient = {
   _id: '643d69a5c3f7b9001cfa093c',
   name: 'Краторная булка N-200i',
   type: 'bun',
   proteins: 80,
   fat: 24,
   carbohydrates: 53,
   calories: 420,
   price: 1255,
   image: 'https://code.s3.yandex.net/react/code/bun-02.png',
   image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
   image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockMain: TIngredient = {
   _id: '643d69a5c3f7b9001cfa0941',
   name: 'Биокотлета из марсианской Магнолии',
   type: 'main',
   proteins: 420,
   fat: 142,
   carbohydrates: 242,
   calories: 4242,
   price: 424,
   image: 'https://code.s3.yandex.net/react/code/meat-01.png',
   image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
   image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockSauce: TIngredient = {
   _id: '643d69a5c3f7b9001cfa0942',
   name: 'Соус Spicy-X',
   type: 'sauce',
   proteins: 30,
   fat: 20,
   carbohydrates: 40,
   calories: 30,
   price: 90,
   image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
   image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
   image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('constructorSlice', () => {
   beforeAll(() => {
      Object.defineProperty(global, 'crypto', {
         value: {
            randomUUID: jest.fn(() => mockId)
         }
      });
   });

   it('должен добавлять булку в конструктор', () => {
      const state = constructorReducer(undefined, addIngredient(mockBun));

      expect(state.bun).toEqual({
         ...mockBun,
         id: mockId
      });
      expect(state.ingredients).toEqual([]);
   });

   it('должен добавлять начинку в конструктор', () => {
      const state = constructorReducer(undefined, addIngredient(mockMain));

      expect(state.ingredients).toEqual([
         {
            ...mockMain,
            id: mockId
         }
      ]);
      expect(state.bun).toBeNull();
   });

   it('должен удалять ингредиент из конструктора', () => {
      const initialState = {
         bun: null,
         ingredients: [
            {
               ...mockMain,
               id: 'ingredient-1'
            },
            {
               ...mockSauce,
               id: 'ingredient-2'
            }
         ] as TConstructorIngredient[]
      };

      const state = constructorReducer(
         initialState,
         removeIngredient('ingredient-1')
      );

      expect(state.ingredients).toEqual([
         {
            ...mockSauce,
            id: 'ingredient-2'
         }
      ]);
   });

   it('должен перемещать ингредиент вверх', () => {
      const firstIngredient = {
         ...mockMain,
         id: 'ingredient-1'
      };

      const secondIngredient = {
         ...mockSauce,
         id: 'ingredient-2'
      };

      const initialState = {
         bun: null,
         ingredients: [firstIngredient, secondIngredient]
      };

      const state = constructorReducer(initialState, moveIngredientUp(1));

      expect(state.ingredients).toEqual([secondIngredient, firstIngredient]);
   });

   it('должен перемещать ингредиент вниз', () => {
      const firstIngredient = {
         ...mockMain,
         id: 'ingredient-1'
      };

      const secondIngredient = {
         ...mockSauce,
         id: 'ingredient-2'
      };

      const initialState = {
         bun: null,
         ingredients: [firstIngredient, secondIngredient]
      };

      const state = constructorReducer(initialState, moveIngredientDown(0));

      expect(state.ingredients).toEqual([secondIngredient, firstIngredient]);
   });
});