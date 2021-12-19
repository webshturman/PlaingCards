import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { AppActionType } from './actions/app-actions';
import { AuthActionsType } from './actions/auth-actions';
import { PasswordActionType } from './actions/password-actions';
import { RegisterActionType } from './actions/register-actions';
import { appReducer } from './reducers/app-reducer';
import { authReducer } from './reducers/auth-reducer';
import { CardsActionType, cardsPackReducer } from './reducers/cards-reducer';
import { passwordReducer } from './reducers/password-reducer';
import { profileReducer } from './reducers/profile-reducer';
import { registerReducer } from './reducers/register-reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  password: passwordReducer,
  register: registerReducer,
  auth: authReducer,
  app: appReducer,
  cards: cardsPackReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export type AppRootState = ReturnType<typeof rootReducer>;
export type AppActionsType =
  | AuthActionsType
  | RegisterActionType
  | PasswordActionType
  | AppActionType
  | CardsActionType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  AppActionsType
>;
// @ts-ignore
window.store = store;
