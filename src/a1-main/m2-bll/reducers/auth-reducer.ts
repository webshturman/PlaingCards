import { MeResponseStateType } from '../../m3-dal/types/loginType';

import { AUTH_ACTIONS_TYPE, AuthActionsType } from 'a1-main/m2-bll/actions/auth-actions';

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
};
// type AuthStateType = typeof initialAuthState;
type AuthStateType = MeResponseStateType & {
  isAuth: boolean;
};
export const authReducer = (
  state: AuthStateType = initialAuthState,
  action: AuthActionsType,
): AuthStateType => {
  switch (action.type) {
    case AUTH_ACTIONS_TYPE.SET_USER_DATA: {
      return {
        ...state,
        ...action.authUserData,
        isAuth: action.isAuth,
      };
    }
    case AUTH_ACTIONS_TYPE.DELETE_USER_DATA: {
      return initialAuthState;
    }
    default:
      return state;
  }
};
