import { ACTIONS_TYPE, PasswordActionType } from '../actions/password-actions';

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
    case ACTIONS_TYPE.SEND_MESSAGE_ON_MAIL:
      return {
        ...state,
        sendMessageSuccess: action.sendMessageSuccess,
      };
    case ACTIONS_TYPE.RENAME_PASSWORD:
      return {
        ...state,
        passwordRename: action.passwordRename,
      };
    default:
      return state;
  }
};

// образец типов экшена
