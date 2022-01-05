import { AUTH_ACTIONS_TYPE, AuthActionsType } from 'a1-main/m2-bll/actions/auth-actions';

const initialAuthState = {
  isAuth: false,
};

export type InitialAuthStateType = typeof initialAuthState;
export const authReducer = (
  state: InitialAuthStateType = initialAuthState,
  action: AuthActionsType,
): InitialAuthStateType => {
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
