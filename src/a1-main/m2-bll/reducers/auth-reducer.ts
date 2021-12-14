import { AuthStateType } from '../../m3-dal/types/loginType';

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
  isAuth: false,
  isFetching: false,
};

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
    case AUTH_ACTIONS_TYPE.TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
