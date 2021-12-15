import { Nullable } from '../../../types/Nullable';

import { AUTH_ACTIONS_TYPE, AuthActionsType } from 'a1-main/m2-bll/actions/auth-actions';

export const nullAuthData = {
  isAuth: false,
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

const initialAuthState = {
  _id: null as Nullable<string>,
  email: null as Nullable<string>,
  name: null as Nullable<string>,
  avatar: null as Nullable<string>,
  publicCardPacksCount: null as Nullable<number>,
  created: null as Nullable<Date>,
  updated: null as Nullable<Date>,
  isAdmin: null as Nullable<boolean>,
  verified: null as Nullable<boolean>,
  rememberMe: null as Nullable<boolean>,
  error: null as Nullable<string>,
  isAuth: false,
};
type AuthStateType = typeof initialAuthState;

export const authReducer = (
  state: AuthStateType = initialAuthState,
  action: AuthActionsType,
): AuthStateType => {
  switch (action.type) {
    case AUTH_ACTIONS_TYPE.SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
      };
    }
    default:
      return state;
  }
};
