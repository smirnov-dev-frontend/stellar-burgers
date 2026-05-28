import userReducer, {
   clearUserErrors,
   getUser,
   loginUser,
   logoutUser,
   registerUser,
   setAuthChecked,
   updateUser
} from './userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
   email: 'test@example.com',
   name: 'Test User'
};

const updatedUser: TUser = {
   email: 'updated@example.com',
   name: 'Updated User'
};

const initialState = {
   user: null,
   isAuthChecked: false,
   isLoading: false,
   error: null,
   updateUserError: null
};

describe('userSlice', () => {
   describe('loginUser', () => {
      it('должен устанавливать isLoading в true при начале входа', () => {
         const state = userReducer(
            undefined,
            loginUser.pending('', {
               email: 'test@example.com',
               password: 'password'
            })
         );

         expect(state).toEqual({
            ...initialState,
            isLoading: true
         });
      });

      it('должен записывать пользователя при успешном входе', () => {
         const state = userReducer(
            {
               ...initialState,
               isLoading: true
            },
            loginUser.fulfilled(mockUser, '', {
               email: 'test@example.com',
               password: 'password'
            })
         );

         expect(state).toEqual({
            ...initialState,
            user: mockUser,
            isAuthChecked: true,
            isLoading: false
         });
      });

      it('должен записывать ошибку при неуспешном входе', () => {
         const errorMessage = 'Не удалось выполнить вход';

         const state = userReducer(
            {
               ...initialState,
               isLoading: true
            },
            loginUser.rejected(
               null,
               '',
               {
                  email: 'test@example.com',
                  password: 'password'
               },
               errorMessage
            )
         );

         expect(state).toEqual({
            ...initialState,
            isLoading: false,
            isAuthChecked: true,
            error: errorMessage
         });
      });
   });

   describe('registerUser', () => {
      it('должен устанавливать isLoading в true при начале регистрации', () => {
         const state = userReducer(
            undefined,
            registerUser.pending('', {
               email: 'test@example.com',
               name: 'Test User',
               password: 'password'
            })
         );

         expect(state).toEqual({
            ...initialState,
            isLoading: true
         });
      });

      it('должен записывать пользователя при успешной регистрации', () => {
         const state = userReducer(
            {
               ...initialState,
               isLoading: true
            },
            registerUser.fulfilled(mockUser, '', {
               email: 'test@example.com',
               name: 'Test User',
               password: 'password'
            })
         );

         expect(state).toEqual({
            ...initialState,
            user: mockUser,
            isAuthChecked: true,
            isLoading: false
         });
      });

      it('должен записывать ошибку при неуспешной регистрации', () => {
         const errorMessage = 'Не удалось выполнить регистрацию';

         const state = userReducer(
            {
               ...initialState,
               isLoading: true
            },
            registerUser.rejected(
               null,
               '',
               {
                  email: 'test@example.com',
                  name: 'Test User',
                  password: 'password'
               },
               errorMessage
            )
         );

         expect(state).toEqual({
            ...initialState,
            isLoading: false,
            isAuthChecked: true,
            error: errorMessage
         });
      });
   });

   describe('getUser', () => {
      it('должен устанавливать isLoading в true при начале получения пользователя', () => {
         const state = userReducer(undefined, getUser.pending(''));

         expect(state).toEqual({
            ...initialState,
            isLoading: true
         });
      });

      it('должен записывать пользователя при успешном получении данных', () => {
         const state = userReducer(
            {
               ...initialState,
               isLoading: true
            },
            getUser.fulfilled(mockUser, '')
         );

         expect(state).toEqual({
            ...initialState,
            user: mockUser,
            isAuthChecked: true,
            isLoading: false
         });
      });

      it('должен сбрасывать пользователя при ошибке получения данных', () => {
         const state = userReducer(
            {
               ...initialState,
               user: mockUser,
               isLoading: true
            },
            getUser.rejected(null, '')
         );

         expect(state).toEqual({
            ...initialState,
            user: null,
            isAuthChecked: true,
            isLoading: false
         });
      });
   });

   describe('updateUser', () => {
      it('должен устанавливать isLoading в true при начале обновления пользователя', () => {
         const state = userReducer(
            {
               ...initialState,
               updateUserError: 'Ошибка'
            },
            updateUser.pending('', {
               email: 'updated@example.com',
               name: 'Updated User'
            })
         );

         expect(state).toEqual({
            ...initialState,
            isLoading: true,
            updateUserError: null
         });
      });

      it('должен обновлять данные пользователя при успешном запросе', () => {
         const state = userReducer(
            {
               ...initialState,
               user: mockUser,
               isLoading: true
            },
            updateUser.fulfilled(updatedUser, '', {
               email: 'updated@example.com',
               name: 'Updated User'
            })
         );

         expect(state).toEqual({
            ...initialState,
            user: updatedUser,
            isLoading: false,
            updateUserError: null
         });
      });

      it('должен записывать ошибку при неуспешном обновлении пользователя', () => {
         const errorMessage = 'Не удалось обновить данные пользователя';

         const state = userReducer(
            {
               ...initialState,
               user: mockUser,
               isLoading: true
            },
            updateUser.rejected(
               null,
               '',
               {
                  email: 'updated@example.com',
                  name: 'Updated User'
               },
               errorMessage
            )
         );

         expect(state).toEqual({
            ...initialState,
            user: mockUser,
            isLoading: false,
            updateUserError: errorMessage
         });
      });
   });

   describe('logoutUser', () => {
      it('должен устанавливать isLoading в true при начале выхода', () => {
         const state = userReducer(
            {
               ...initialState,
               user: mockUser,
               isAuthChecked: true
            },
            logoutUser.pending('')
         );

         expect(state).toEqual({
            ...initialState,
            user: mockUser,
            isAuthChecked: true,
            isLoading: true
         });
      });

      it('должен очищать пользователя при успешном выходе', () => {
         const state = userReducer(
            {
               ...initialState,
               user: mockUser,
               isAuthChecked: true,
               isLoading: true
            },
            logoutUser.fulfilled(undefined, '')
         );

         expect(state).toEqual({
            ...initialState,
            user: null,
            isAuthChecked: true,
            isLoading: false
         });
      });

      it('должен очищать пользователя при ошибке выхода', () => {
         const state = userReducer(
            {
               ...initialState,
               user: mockUser,
               isAuthChecked: true,
               isLoading: true
            },
            logoutUser.rejected(null, '')
         );

         expect(state).toEqual({
            ...initialState,
            user: null,
            isAuthChecked: true,
            isLoading: false
         });
      });
   });

   it('должен очищать ошибки пользователя', () => {
      const state = userReducer(
         {
            ...initialState,
            error: 'Ошибка входа',
            updateUserError: 'Ошибка обновления'
         },
         clearUserErrors()
      );

      expect(state).toEqual({
         ...initialState,
         error: null,
         updateUserError: null
      });
   });

   it('должен изменять статус проверки авторизации', () => {
      const state = userReducer(undefined, setAuthChecked(true));

      expect(state).toEqual({
         ...initialState,
         isAuthChecked: true
      });
   });
});