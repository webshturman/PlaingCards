import { ACTIONS_TYPE_PASSWORD, PasswordActionType } from '../actions/password-actions';

export type initialPasswordStateType = {
  sendMessageSuccess: boolean;
  passwordRename: boolean;
};

const initialPasswordState: initialPasswordStateType = {
  sendMessageSuccess: false,
  passwordRename: false,
};

export const passwordReducer = (
  state: initialPasswordStateType = initialPasswordState,
  action: PasswordActionType,
): initialPasswordStateType => {
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
