import {
  setEmailAC,
  setErrorMessageAC,
  setIsFethingAC,
  setStatusAC,
} from '../actions/app-actions';

import { appReducer, InitialRecoveryStateType } from './app-reducer';

test('the error message should be shown', () => {
  const startState: InitialRecoveryStateType = {
    error: false,
    textError: '',
    isFetching: false,
    email: '',
    status: false,
  };

  const action = setErrorMessageAC(true, 'some error');

  const endState = appReducer(startState, action);

  expect(endState.textError).toBe('some error');
  expect(endState.error).toBe(true);
  expect(endState.status).toBe(false);
});

test('spinner should be shown', () => {
  const startState: InitialRecoveryStateType = {
    error: false,
    textError: '',
    isFetching: false,
    email: '',
    status: false,
  };

  const action = setIsFethingAC(true);

  const endState = appReducer(startState, action);

  expect(endState.isFetching).toBe(true);
  expect(endState.status).toBe(false);
});

test('email chould be set', () => {
  const startState: InitialRecoveryStateType = {
    error: false,
    textError: '',
    isFetching: false,
    email: '',
    status: false,
  };

  const action = setEmailAC('aaaa@bk.ru');

  const endState = appReducer(startState, action);

  expect(endState.email).toBe('aaaa@bk.ru');
  expect(endState.status).toBe(false);
});

test('loading should be shown', () => {
  const startState: InitialRecoveryStateType = {
    error: false,
    textError: '',
    isFetching: false,
    email: '',
    status: false,
  };

  const action = setStatusAC(true);

  const endState = appReducer(startState, action);

  expect(endState.email).toBe('');
  expect(endState.status).toBe(true);
});
