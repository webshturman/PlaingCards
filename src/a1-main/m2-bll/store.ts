import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { AuthActionsType } from './actions/auth-actions';
import { RegisterActionType } from './actions/register-actions';
import { authReducer } from './reducers/auth-reducer';
import { passwordReducer } from './reducers/password-reducer';
import { profileReducer } from './reducers/profile-reducer';
import { registerReducer } from './reducers/register-reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  password: passwordReducer,
  register: registerReducer,
  auth: authReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export type AppReducerType = ReturnType<typeof rootReducer>;
export type AppActionsType = AuthActionsType | RegisterActionType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppReducerType,
  unknown,
  AppActionsType
>;
// @ts-ignore
window.store = store;
