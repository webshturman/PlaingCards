import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { loginReducer } from './reducers/login-reducer';
import { passwordReducer } from './reducers/password-reducer';
import { profileReducer } from './reducers/profile-reducer';
import { registerReducer } from './reducers/register-reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  login: loginReducer,
  password: passwordReducer,
  register: registerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>;
export type AppActionsType = any;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  AppActionsType
>;
// @ts-ignore
window.store = store;
