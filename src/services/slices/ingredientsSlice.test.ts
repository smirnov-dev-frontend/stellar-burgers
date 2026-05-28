import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
   {
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
   },
   {
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
   }
];

describe('ingredientsSlice', () => {
   it('должен устанавливать isLoading в true при начале запроса', () => {
      const state = ingredientsReducer(undefined, fetchIngredients.pending(''));

      expect(state).toEqual({
         items: [],
         isLoading: true,
         error: null
      });
   });

   it('должен записывать ингредиенты и устанавливать isLoading в false при успешном запросе', () => {
      const state = ingredientsReducer(
         {
            items: [],
            isLoading: true,
            error: null
         },
         fetchIngredients.fulfilled(mockIngredients, '')
      );

      expect(state).toEqual({
         items: mockIngredients,
         isLoading: false,
         error: null
      });
   });

   it('должен записывать ошибку и устанавливать isLoading в false при неуспешном запросе', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';

      const state = ingredientsReducer(
         {
            items: [],
            isLoading: true,
            error: null
         },
         fetchIngredients.rejected(null, '', undefined, errorMessage)
      );

      expect(state).toEqual({
         items: [],
         isLoading: false,
         error: errorMessage
      });
   });
});