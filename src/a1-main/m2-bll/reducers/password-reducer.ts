import { ACTIONS_TYPE_PASSWORD, PasswordActionType } from '../actions/password-actions';

const initialPasswordState = {
  sendMessageSuccess: false,
  passwordRename: false,
};
export type InitialPasswordStateType = typeof initialPasswordState;

export const passwordReducer = (
  state: InitialPasswordStateType = initialPasswordState,
  action: PasswordActionType,
): InitialPasswordStateType => {
  switch (action.type) {
    case ACTIONS_TYPE_PASSWORD.SEND_MESSAGE_ON_MAIL:
      return {
        ...state,
        sendMessageSuccess: action.sendMessageSuccess,
      };
    case ACTIONS_TYPE_PASSWORD.RENAME_PASSWORD:
      return {
        ...state,
        passwordRename: action.passwordRename,
      };
    default:
      return state;
  }
};
