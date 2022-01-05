import { ACTIONS_TYPE, RegisterActionType } from '../actions/register-actions';

const initialRegisterState = {
  signUpStatus: false,
};

export type InitialRegisterStateType = typeof initialRegisterState;

export const registerReducer = (
  state: InitialRegisterStateType = initialRegisterState,
  action: RegisterActionType,
): InitialRegisterStateType => {
  switch (action.type) {
    case ACTIONS_TYPE.SET_REGISTER_STATUS:
      return { ...state, signUpStatus: action.registerStatus };
    default:
      return state;
  }
};
