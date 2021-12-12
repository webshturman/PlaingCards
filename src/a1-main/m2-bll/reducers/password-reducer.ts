import { LetterType } from '../../../a2-features/f3/RecoveryPassword';
import { ReamePasswordType } from '../../../a2-features/NewPassword';
import { passwordAPI } from '../../m3-dal/register-api';
import { AppThunk } from '../store';

export type initialPasswordStateType = {
  sendMessageSuccess: boolean;
  passwordRename: boolean;
};

const initialPasswordState: initialPasswordStateType = {
  sendMessageSuccess: false,
  passwordRename: false,
};

export enum ACTIONS_TYPE {
  SEND_MESSAGE_ON_MAIL = 'password-reducer/SEND_MESSAGE_ON_MAIL',
  RENAME_PASSWORD = 'password-reducer/RENAME_PASSWORD',
}

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

export type PasswordActionType =
  | ReturnType<typeof successSendMessgeAC>
  | ReturnType<typeof successRenamePasswordAC>;
export const successSendMessgeAC = (sendMessageSuccess: boolean) =>
  ({
    type: ACTIONS_TYPE.SEND_MESSAGE_ON_MAIL,
    sendMessageSuccess,
  } as const);

export const successRenamePasswordAC = (passwordRename: boolean) =>
  ({
    type: ACTIONS_TYPE.RENAME_PASSWORD,
    passwordRename,
  } as const);

export const sendMessageOnEmail =
  (letterToThePost: LetterType): AppThunk =>
  async dispatch => {
    try {
      const data = await passwordAPI.sendMessage(letterToThePost);
      dispatch(successSendMessgeAC(data.data.success));
      console.log(data.data.success);
    } catch (error: any) {
      console.log(error);
    }
  };

export const renamePassword =
  (newPassword: ReamePasswordType): AppThunk =>
  async dispatch => {
    try {
      const data = await passwordAPI.updatePassword(newPassword);
      dispatch(successRenamePasswordAC(data.data));
      console.log(data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
