import { configureStore } from '@reduxjs/toolkit';
import { renderHook, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredential } from '../fixtures/testUser';

const getMockStore = (initialSatate) => {
   return configureStore({
      reducer: {
         auth: authSlice.reducer
      },
      preloadedState: {
         auth: { ...initialSatate }
      }
   })
}

describe('Pruebas en useAuthStore', () => {

   beforeEach(() => localStorage.clear());

   test('Debe de regresar los valores por defecto', () => {
      const mockStore = getMockStore({ ...initialState });
      const { result } = renderHook(() => useAuthStore(), {
         wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
      })
      expect(result.current).toEqual({
         ...initialState,
         checkAuthToken: expect.any(Function),
         startLogin: expect.any(Function),
         startLogout: expect.any(Function),
         startRegister: expect.any(Function),
      })
   })

   test('startLogin debe de realizar el login correctamente', async () => {
      const mockStore = getMockStore({ ...notAuthenticatedState });
      const { result } = renderHook(() => useAuthStore(), {
         wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
      })
      await act(async () => {
         await result.current.startLogin(testUserCredential)
      })
      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined,
         status: 'authenticated',
         user: { name: 'test', uid: '63b22b043a3d91f183e7cd80' },
      })
      expect(localStorage.getItem('token')).toEqual(expect.any(String));
      expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
   })

   test('startLogin debe de fallar la autenticación', async () => {
      const mockStore = getMockStore({ ...notAuthenticatedState });
      const { result } = renderHook(() => useAuthStore(), {
         wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
      })
      await act(async () => {
         await result.current.startLogin({ email: 'algo@google.com', password: '123456789' })
      })
      const { errorMessage, status, user } = result.current;
      expect(localStorage.getItem('token')).toBe(null);
      expect(localStorage.getItem('token-init-date')).toBe(null);
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: 'Incorrect credentials',
         status: 'not-authenticated',
         user: {},
      })
      await waitFor(
         () => expect(result.current.errorMessage).toBe(undefined)
      )
   })

   test('startRegister debe de crear un usuario', async () => {
      const newUser = {
         email: 'algo@google.com',
         password: '123456',
         name: 'Test 2'
      }
      const mockStore = getMockStore({ ...notAuthenticatedState });
      const { result } = renderHook(() => useAuthStore(), {
         wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
      })
      //*Creación de un espia para sustituir el método
      const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
         data: {
            ok: true,
            uid: 'algunUid',
            name: 'Test 2',
            token: 'algunToken'
         }
      })
      await act(async () => {
         await result.current.startRegister(newUser)
      })
      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined,
         status: 'authenticated',
         user: { name: 'Test 2', uid: 'algunUid' }
      })
      //*Se debe reestablecer la función al finalizar el test
      spy.mockRestore();
   })

   test('startRegister debe de falla al crear un usuario', async () => {
      const mockStore = getMockStore({ ...notAuthenticatedState });
      const { result } = renderHook(() => useAuthStore(), {
         wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
      });
      await act(async () => {
         await result.current.startRegister(testUserCredential)
      });
      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: (expect.any(String)),
         status: 'not-authenticated',
         user: {}
      })
   })

   test('checkAuthToken debe de fallar si no hay token', async () => {
      const mockStore = getMockStore({ ...initialState });
      const { result } = renderHook(() => useAuthStore(), {
         wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
      });
      await act(async () => {
         await result.current.checkAuthToken(testUserCredential)
      });
      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined,
         status: 'not-authenticated',
         user: {}
      })
   })

   test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {
      const { data } = await calendarApi.post('/auth', testUserCredential);
      localStorage.setItem('token', data.token);
      const mockStore = getMockStore({ ...initialState });
      const { result } = renderHook(() => useAuthStore(), {
         wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
      });
      await act(async () => {
         await result.current.checkAuthToken()
      });
      const { errorMessage, status, user } = result.current;
      console.log({ errorMessage, status, user })
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined,
         status: 'authenticated',
         user: { name: 'test', uid: '63b22b043a3d91f183e7cd80' }
      })
   })

})