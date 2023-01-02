import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredential } from '../../fixtures/testUser';

describe('Puenas en authSlice', () => {

   test('Debe de regresar el estado inicial', () => {
      expect(authSlice.getInitialState()).toEqual(initialState);
   })

   test('Debe de realizar un login', () => {
      const state = authSlice.reducer(initialState, onLogin(testUserCredential));
      expect(state).toEqual({
         status: 'authenticated',
         user: testUserCredential,
         errorMessage: undefined
      });
   })

   test('Debe de realizar el logout', () => {
      const state = authSlice.reducer(authenticatedState, onLogout());
      expect(state).toEqual({
         status: 'not-authenticated',
         user: {},
         errorMessage: undefined
      });
   })

   test('Debe de realizar el logout', () => {
      const errorMessage = 'Invalid Credentials'
      const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
      expect(state).toEqual({
         status: 'not-authenticated',
         user: {},
         errorMessage: errorMessage
      });
   })

   test('Debe de limpiar el mnesaje de error', () => {
      const errorMessage = 'Invalid Credentials'
      const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
      const newState = authSlice.reducer(state, clearErrorMessage());
      expect(newState.errorMessage).toBe(undefined);
   })

})