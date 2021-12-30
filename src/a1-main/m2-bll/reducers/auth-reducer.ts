import { AUTH_ACTIONS_TYPE, AuthActionsType } from 'a1-main/m2-bll/actions/auth-actions';

const initialAuthState = {
  isAuth: false,
};

type AuthStateType = {
  isAuth: boolean;
};
export const authReducer = (
  state: AuthStateType = initialAuthState,
  action: AuthActionsType,
): AuthStateType => {
  switch (action.type) {
    case AUTH_ACTIONS_TYPE.SET_AUTH_STATUS: {
      return {
        ...state,
        isAuth: action.isAuth,
      };
    }
    default:
      return state;
  }
};
