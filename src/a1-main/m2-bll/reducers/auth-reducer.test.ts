import { setAuthStatus } from '../actions/auth-actions';

import { authReducer, InitialAuthStateType } from './auth-reducer';

test('user autorization chould be set', () => {
  const startState: InitialAuthStateType = {
    isAuth: false,
  };

  const action = setAuthStatus(true);

  const endState = authReducer(startState, action);

  expect(endState.isAuth).toBe(true);
});
