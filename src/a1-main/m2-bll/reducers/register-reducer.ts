import { ACTIONS_TYPE, RegisterActionType } from '../actions/register-actions';

export type initialRegisterStateType = {
  signUpStatus: boolean;
};

const initialRegisterState: initialRegisterStateType = {
  signUpStatus: false,
};

export const registerReducer = (
  state: initialRegisterStateType = initialRegisterState,
  action: RegisterActionType,
): initialRegisterStateType => {
  switch (action.type) {
    case ACTIONS_TYPE.SET_REGISTER_STATUS:
      return { ...state, signUpStatus: action.registerStatus };
    default:
      return state;
  }
};
