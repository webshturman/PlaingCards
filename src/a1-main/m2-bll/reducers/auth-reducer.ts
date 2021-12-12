import { AUTH_ACTIONS_TYPE, AuthActionsType } from '../actions/auth-actions';

export type AuthStateType = {
  _id: string | null;
  email: string | null;
  name: string | null;
  avatar?: string | null;
  publicCardPacksCount: number | null;
  created: Date | null;
  updated: Date | null;
  isAdmin: boolean | null;
  verified: boolean | null;
  rememberMe: boolean | null;
  error?: string | null;
  isAuth: boolean;
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
    default:
      return state;
  }
};
