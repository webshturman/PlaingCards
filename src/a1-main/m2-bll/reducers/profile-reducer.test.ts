import { MeResponseStateType } from '../../m3-dal/types/loginType';
import {
  deleteUserData,
  setAuthUserData,
  updateUserData,
} from '../actions/profile-actions';

import { profileReducer } from './profile-reducer';

test('data of user should be received', () => {
  const startState: MeResponseStateType = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: null,
    error: null,
  };
  const user = {
    _id: '1',
    email: 'aaa@mail.ru',
    name: 'name',
    avatar: null,
    publicCardPacksCount: 3,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: false,
    error: null,
  };
  const action = setAuthUserData(user);

  const endState = profileReducer(startState, action);

  expect(endState.email).toBe('aaa@mail.ru');
  expect(endState.name).toBe('name');
});
test('data of user should be update', () => {
  const startState: MeResponseStateType = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: null,
    error: null,
  };
  const action = updateUserData('Valera', 'avatar.png');

  const endState = profileReducer(startState, action);

  expect(endState.avatar).toBe('avatar.png');
  expect(endState.name).toBe('Valera');
});
test('data of user should be delete', () => {
  const startState: MeResponseStateType = {
    _id: '1',
    email: 'aaa@mail.ru',
    name: 'name',
    avatar: null,
    publicCardPacksCount: 3,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: false,
    error: null,
  };
  const action = deleteUserData();

  const endState = profileReducer(startState, action);

  expect(endState.email).toBe(null);
  expect(endState.name).toBe(null);
});
